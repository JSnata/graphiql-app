'use client';

import { Box, Button, Typography } from '@mui/material';
import CodeMirror, {
    Decoration,
    DecorationSet,
    EditorView,
    RangeSetBuilder,
    StateEffect,
    StateField,
} from '@uiw/react-codemirror';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { json } from '@codemirror/lang-json';
import { decodeBase64, encodeBase64 } from '@/utils/base64';
import makeBeautify from '@/utils/makeBeautify';
import { useAppSelector } from '@/lib/hook';

const updateDecorations = StateEffect.define<DecorationSet>();

const decorationsField = StateField.define<DecorationSet>({
    create() {
        return Decoration.none;
    },
    update(decorations, transaction) {
        const updatedDecorations = transaction.effects.find((effect) => effect.is(updateDecorations));

        if (updatedDecorations) {
            return updatedDecorations.value;
        }

        return decorations.map(transaction.changes);
    },
    provide: (field) => EditorView.decorations.from(field),
});

export default function HttpBody() {
    const { replace } = useRouter();
    const pathname = usePathname();
    const t = useTranslations('Request');
    const params = pathname.split('/').filter(Boolean); // аналог useParams, обновляющийся при использовании history API
    const searchParams = useSearchParams();
    const [code, setCode] = useState(decodeBase64(decodeURIComponent(params[2] || '')));
    const [error, setError] = useState('');
    const variablesBody = useAppSelector((state) => state.variables.variablesBody);

    const editorRef = useRef<EditorView | null>(null);

    const updateUrl = (newCode: string) => {
        if (params[1]) {
            replace(`/${params[0]}/${params[1]}/${encodeBase64(newCode)}?${searchParams.toString()}`);
        } else {
            setError(t('emptyEndpoint'));
        }
    };

    const handleFormat = async () => {
        const result = await makeBeautify(code, 'json');
        setCode(result.code);
        setError(result.error);
        updateUrl(result.code);
    };

    const highlightVariables = useCallback(
        (inputCode: string, view: EditorView) => {
            const regex = /{{(.*?)}}/g;
            const matches = [...inputCode.matchAll(regex)];

            const builder = new RangeSetBuilder<Decoration>();
            matches.forEach((match) => {
                const key = match[1];
                const foundVariable = variablesBody.find((variable) => variable.key === key);

                if (foundVariable) {
                    const from = match.index as number;
                    const to = from + match[0].length;
                    const deco = Decoration.mark({ class: 'highlight-variable' });
                    builder.add(from, to, deco);
                }
            });

            const decorations = builder.finish();

            view.dispatch({
                effects: updateDecorations.of(decorations),
            });
        },
        [variablesBody],
    );

    useEffect(() => {
        const editor = editorRef.current;
        if (editor) {
            highlightVariables(code, editor);
        }
    }, [code, variablesBody, highlightVariables]);

    return (
        <Box sx={{ width: '100%' }}>
            <CodeMirror
                value={code}
                ref={(el) => {
                    if (el?.view) editorRef.current = el.view;
                }}
                onChange={(value) => {
                    setCode(value);
                    const editor = editorRef.current;
                    if (editor) {
                        highlightVariables(value, editor);
                    }
                }}
                onBlur={() => updateUrl(code)}
                extensions={[json(), decorationsField]}
                placeholder="Text/JSON"
                theme="light"
                height="150px"
            />
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '25px',
                    mt: 2,
                }}
            >
                <Button onClick={handleFormat} variant="contained">
                    {t('beautify')}
                </Button>
                {error && <Typography sx={{ color: 'red' }}>{error}</Typography>}
            </Box>
        </Box>
    );
}
