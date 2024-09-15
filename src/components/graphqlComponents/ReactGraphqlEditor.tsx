'use client';

import { DocExplorer, GraphiQLProvider } from '@graphiql/react';
import { createGraphiQLFetcher } from '@graphiql/toolkit';
import '@graphiql/react/dist/style.css';

interface IReactGraphqlEditorProps {
    url: string;
}

function ReactGraphqlEditor(props: IReactGraphqlEditorProps) {
    const { url } = props;
    const fetcher = createGraphiQLFetcher({
        url,
    });

    return (
        <GraphiQLProvider fetcher={fetcher}>
            <div className="graphiql-container">
                <DocExplorer />
            </div>
        </GraphiQLProvider>
    );
}

export default ReactGraphqlEditor;
