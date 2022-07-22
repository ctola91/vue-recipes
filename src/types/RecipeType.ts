export type Recipe = {
    id: string,
    title: string,
    description: string,
    ingredients: Array<string>,
    instructions: string,
    images: Array<string>
} | undefined | null