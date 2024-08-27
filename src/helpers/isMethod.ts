export default function isMethod(str: string): boolean {
    return /^(get|post|put|patch|delete|head|options)$/i.test(str);
}
