export const getPaginatedItems = (items: any[], currentPage: number, itemsPerPage: number) => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return items.slice(start, end);
};

export const calculateTotalPages = (items: any[], itemsPerPage: number) => {
    return Math.ceil(items.length / itemsPerPage);
};

export const generatePaginationNumbers = (currentPage: number, totalPages: number, maxPagesToShow: number = 3) => {
    const range = [];
    let start = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let end = Math.min(totalPages, start + maxPagesToShow - 1);

    if (end - start + 1 < maxPagesToShow) {
        start = Math.max(1, end - maxPagesToShow + 1);
    }

    for (let i = start; i <= end; i++) {
        range.push(i);
    }

    return range;
};