export function getBookById({ params }) {
    return { bookId: params.id };
}

export function isContentIncluded(content, contents) {
    if (!Array.isArray(contents)) {
        console.error('contents is not an array');
        return false;
    }
    return contents.some(b => b.bookId === content.bookId);
}