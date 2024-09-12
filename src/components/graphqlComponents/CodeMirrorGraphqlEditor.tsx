import { GraphQLSchema } from 'graphql/type';
import CodeMirror from '@uiw/react-codemirror';
import { autocompletion } from '@codemirror/autocomplete';
import { graphql } from 'cm6-graphql';
import { Box } from '@mui/material';

interface IGraphQLEditorProps {
    schema: GraphQLSchema | null;
    handleChange: (value: string) => void;
}

function CodeMirrorGraphqlEditor(props: IGraphQLEditorProps) {
    const { schema, handleChange } = props;

    return (
        <Box sx={{ width: '100%', border: '1px solid #ccc' }}>
            <CodeMirror
                value="query {}"
                height="400px"
                width="auto"
                extensions={[graphql(schema), autocompletion()]}
                onChange={(value) => {
                    handleChange(value);
                }}
            />
        </Box>
    );
}

export default CodeMirrorGraphqlEditor;
