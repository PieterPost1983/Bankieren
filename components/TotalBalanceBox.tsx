import AnimatedCounter from '@/components/AnimatedCounter'
import DoughnutChart from '@/components/DoughnutChart'

const TotalBalanceBox = ({
    accounts = [], totalBanks, totalCurrentBalance
}: TotlaBalanceBoxProps) => {
    return (
        <section className='total-balance'>
            <div className='total-balance-chart'>
                <DoughnutChart accounts={accounts} />
            </div>
            <div className='flex flex-col gap-6'>
                <h2 className='header-2'>
                    Bank Rekeningen: {totalBanks}
                </h2>
                <div className='flex flex-col gap-2'>
                    <p className='total-balance-label'>
                        Momenteel Totale Balans
                    </p>

                    <div className='total-balance-amount flex-center gap-2'>
                        <AnimatedCounter amount={totalCurrentBalance} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TotalBalanceBox