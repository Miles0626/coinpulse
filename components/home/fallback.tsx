import DataTable from '@/components/DataTable'

const CoinOverviewFallback = () => {
    return (
        <div id='coin-overview-fallback'>
            <div className='header pt-2'>
                <div className='header-image skeleton' />
                <div className='info'>
                    <div className='header-line-sm skeleton' />
                    <div className='header-line-lg skeleton' />
                </div>
            </div>
            <div className='chart'>
                <div className='chart-skeleton skeleton' />
            </div>
        </div>
    )
}

const trendingCoinsFallbackColumns: DataTableColumn<number>[] = [
    {
        header: 'Name',
        cellClassName: 'name-cell',
        cell: () => (
            <div className='name-link'>
                <div className='name-image skeleton' />
                <div className='name-line skeleton' />
            </div>
        ),
    },
    {
        header: '24h Change',
        cellClassName: 'change-cell',
        cell: () => (
            <div className='price-change'>
                <div className='change-line skeleton' />
                <div className='change-icon skeleton' />
            </div>
        ),
    },
    {
        header: 'Price',
        cellClassName: 'price-cell',
        cell: () => <div className='price-line skeleton' />,
    },
]

const TrendingCoinsFallback = () => {
    const skeletonRows = Array.from({ length: 6 }, (_, index) => index)

    return (
        <div id='trending-coins-fallback'>
            <h4>Trending Coins</h4>
            <DataTable
                columns={trendingCoinsFallbackColumns}
                data={skeletonRows}
                rowKey={(row) => row}
                tableClassName='trending-coins-table'
                headerCellClassName='py-3!'
                bodyCellClassName='py-2!'
            />
        </div>
    )
}

export { CoinOverviewFallback, TrendingCoinsFallback }
