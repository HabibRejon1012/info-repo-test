export type ResultData<T, F> = {
    data: T[];
    loading: boolean;
    error: string | null;
    getData: (params: F) => Promise<void>
    loadMore: () => Promise<void>
    isLoadingMore: boolean
    openUrl: (url: string) => Promise<void>
    total: number | null
    isComplete: boolean
}