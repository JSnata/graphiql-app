export default function generateRequestBodyWithVars(body: string, variables: { [key: string]: string }[]) {
    const regex = /{{(.*?)}}/g;
    const replaceVariables = (str: string) => {
        return str.replace(regex, (match, variableName) => {
            const variable = variables.find((v) => v.key === variableName);
            if (!variable) {
                throw new Error(`Not find Variable {{${variableName}}}`);
            }
            return `"${variable.value}"`;
        });
    };
    const bodyWithReplacedVars = replaceVariables(body);
    // console.log(bodyWithReplacedVars);
    return bodyWithReplacedVars;
}

export function generateHeaders(headers: { [key: string]: string }[]) {
    const result: { [key: string]: string } = {};
    headers.forEach((header) => {
        if (header.value && header.value.length > 0) {
            result[header.key] = header.value;
        }
    });

    // console.log(result);
    return result;
}
