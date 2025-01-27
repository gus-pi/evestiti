export const formatDate = (isoDate: Date) => {
    const date = new Date(isoDate)
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}