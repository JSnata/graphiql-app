import React, { useEffect, useRef } from 'react';
import { graphql } from 'cm6-graphql';
import { GraphQLSchema } from 'graphql/type';
import { bracketMatching, syntaxHighlighting } from '@codemirror/language';
import { autocompletion, closeBrackets } from '@codemirror/autocomplete';
import { EditorView, lineNumbers } from '@codemirror/view';
import CodeMirror, { EditorState, oneDark, oneDarkHighlightStyle } from '@uiw/react-codemirror';

interface IGraphQLEditorProps {
    schema: GraphQLSchema | null;
}

function GraphQLEditor({ schema }: IGraphQLEditorProps) {
    // const [editorState, setEditorState] = useState<EditorState | null>(null);
    const editorContainerRef = useRef<HTMLDivElement>(null);

    // Это стандартное создание редактора code mirror
    // Тут работают подсказки query и mutation но не работают подсказки из схемы например https://rickandmortyapi.com/graphql
    // В консоли ошибка пакетов graphql возможно cm6-graphql использует другую версию пакета graphql
    // поле появится только после создания схемы
    // при тестировании на https://rickandmortyapi.com/graphql надо удалить ?sdl в sdl endpoint поле
    useEffect(() => {
        if (schema && editorContainerRef.current) {
            const state = EditorState.create({
                doc: `mutation mutationName {\n  setString(value: "newString")\n}`,
                extensions: [
                    bracketMatching(),
                    closeBrackets(),
                    autocompletion(),
                    lineNumbers(),
                    oneDark,
                    syntaxHighlighting(oneDarkHighlightStyle),
                    graphql(schema),
                ],
            });

            const view = new EditorView({
                state,
                parent: editorContainerRef.current,
            });

            return () => {
                view.destroy();
            };
        }
        return undefined;
    }, [schema]);

    // CodeMirror react работает без ошибок, но при этом не работает автокомплит даже стандартных методов query и mutation
    // И не работает подсказка схемы
    return (
        <>
            <CodeMirror
                value="Query"
                height="500px"
                extensions={[
                    bracketMatching(),
                    closeBrackets(),
                    // history(),
                    autocompletion(),
                    lineNumbers(),
                    oneDark,
                    syntaxHighlighting(oneDarkHighlightStyle),
                    graphql(schema),
                ]}
                onChange={() => {
                    // console.log('Code changed:', value);
                }}
            />
            <div ref={editorContainerRef} style={{ height: '500px' }} />
        </>
    );
}

export default GraphQLEditor;
