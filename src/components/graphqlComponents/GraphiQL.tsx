// 'use client';
//
// Это либа @graphiql/react позволяет строить документацию для отображения пользователю
// Пока не нужна, но оставил на будущее для доки graphQL

// import React from 'react';
// import { DocExplorer, GraphiQLProvider, QueryEditor } from '@graphiql/react';
// import '@graphiql/react/dist/style.css';
// import { Box } from '@mui/material';
// import { createGraphiQLFetcher } from '@graphiql/toolkit';
//
// const fetcher = createGraphiQLFetcher({
//     url: 'https://rickandmortyapi.com/graphql',
// });
//
// function GraphiQL() {
//     return (
//         <GraphiQLProvider fetcher={fetcher}>
//             <Box sx={{ width: '100%' }}>
//                 <div className="graphiql-container">
//                     <DocExplorer />
//                     {/* <QueryEditor /> */}
//                 </div>
//             </Box>
//         </GraphiQLProvider>
//     );
// }
//
// export default GraphiQL;
