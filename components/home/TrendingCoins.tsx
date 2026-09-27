import { fetcher } from '@/lib/coingecko.action';
import DataTable from '../DataTable';
import { cn, formatCurrency, formatPercentage } from '@/lib/utils';
import { TrendingDown, TrendingUp } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';
import { TrendingCoinsFallback } from '@/components/home/fallback';

const TrendingCoins = async () => {
    try {
        await fetcher<{ coins: TrendingCoin[] }>('search/trending', undefined, 300);
    } catch (error) {
        console.error('Failed to fetch trending coins:', error);
        return <TrendingCoinsFallback />;
    }

    const columns: DataTableColumn<TrendingCoin>[] = [
        {
            header: 'Name',
            cellClassName: 'name-cell',
            cell: (coin) => {
                const item = coin.item;
                return (
                    <Link href={`/coins/${item.id}`}>
                        <Image src={item.large} alt={item.name} width={36} height={36}></Image>
                        <p>{item.name}</p>
                    </Link>
                )
            }
        },
        {
            header: '24h Change',
            cellClassName: 'change-cell',
            cell: (coin) => {
                const item = coin.item;
                const isTrendingUp = item.data.price_change_percentage_24h.usd > 0;
                return (
                    <div className={cn('price-change', isTrendingUp ? 'text-green-500' : 'text-red-500')}>
                        <p className='flex items-center'>
                            {formatPercentage(item.data.price_change_percentage_24h.usd)}
                            {
                                isTrendingUp ? (
                                    <TrendingUp width={16} height={16} />
                                ) : (<TrendingDown width={16} height={16} />)
                            }
                        </p>
                    </div>
                )
            }
        },
        {
            header: 'Price',
            cellClassName: 'price-cell',
            cell: (coin) => formatCurrency(coin.item.data.price)
        }
    ]

    const dummyTrendingCoins: TrendingCoin[] = [
        {
            item: {
                id: 'bitcoin',
                name: 'Bitcoin',
                symbol: 'BTC',
                market_cap_rank: 1,
                thumb: '/logo.svg',
                large: '/logo.svg',
                data: {
                    price: 89113.0,
                    price_change_percentage_24h: { usd: 2.35 },
                },
            },
        },
        {
            item: {
                id: 'ethereum',
                name: 'Ethereum',
                symbol: 'ETH',
                market_cap_rank: 2,
                thumb: '/converter.svg',
                large: '/converter.svg',
                data: {
                    price: 3120.45,
                    price_change_percentage_24h: { usd: -0.87 },
                },
            },
        },
        {
            item: {
                id: 'solana',
                name: 'Solana',
                symbol: 'SOL',
                market_cap_rank: 5,
                thumb: '/logo.svg',
                large: '/logo.svg',
                data: {
                    price: 148.92,
                    price_change_percentage_24h: { usd: 5.61 },
                },
            },
        },
        {
            item: {
                id: 'ripple',
                name: 'XRP',
                symbol: 'XRP',
                market_cap_rank: 6,
                thumb: '/converter.svg',
                large: '/converter.svg',
                data: {
                    price: 0.5231,
                    price_change_percentage_24h: { usd: -1.24 },
                },
            },
        },
        {
            item: {
                id: 'dogecoin',
                name: 'Dogecoin',
                symbol: 'DOGE',
                market_cap_rank: 8,
                thumb: '/logo.svg',
                large: '/logo.svg',
                data: {
                    price: 0.1523,
                    price_change_percentage_24h: { usd: 3.08 },
                },
            },
        },
        {
            item: {
                id: 'cardano',
                name: 'Cardano',
                symbol: 'ADA',
                market_cap_rank: 9,
                thumb: '/converter.svg',
                large: '/converter.svg',
                data: {
                    price: 0.6412,
                    price_change_percentage_24h: { usd: -0.42 },
                },
            },
        },
    ]

    return (
        <div id='trending-coins'>
            <h4>Trending Coins</h4>
            <DataTable
                columns={columns}
                data={dummyTrendingCoins.slice(0, 6) || []}
                rowKey={(coin) => coin.item.id}
                tableClassName='trending-coins-table'
                headerCellClassName='py-3!'
                bodyCellClassName='py-2!'
            />
        </div>
    )
}

export default TrendingCoins