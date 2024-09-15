export default function isMethod(str: string): boolean {
    return /^(GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)$/.test(str);
}
