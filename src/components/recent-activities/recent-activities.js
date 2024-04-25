import React from "react";

import BalanceCryptoCurrencyIcon from "../currency-icon/balance-crypto-currency-icon";
import TransactionTypeStatus from "../transaction_type/transaction-type-status";

class RecentActivities extends React.Component {

    render = () => {
        return (
            <div className="recent-activities">
                <div className="title">
                    Recent Activities
                </div>

                <div className="block-recent-activities">
                    <table className="table-recent-activities">
                        <thead>
                            <tr>
                                <th>
                                    Coin
                                </th>
                                <th>
                                    Transaction
                                </th>
                                <th>
                                    ID
                                </th>
                                <th>
                                    Date
                                </th>
                                <th>
                                    Status
                                </th>
                                <th>
                                    Fees
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <BalanceCryptoCurrencyIcon currency="BTC" width={32} height={32} />
                                </td>
                                <td>
                                    <div className="amount">$659.10</div>
                                    <div className="transaction-type">Withdraw BTC</div>
                                </td>
                                <td>
                                    #14525156
                                </td>
                                <td>
                                    Mar 21, 2022
                                </td>
                                <td>
                                    <TransactionTypeStatus transactionType="AFF_PL_TO" />
                                </td>
                                <td>
                                    0.0005
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <BalanceCryptoCurrencyIcon currency="USDT" width={32} height={32} />
                                </td>
                                <td>
                                    <div className="amount">$659.10</div>
                                    <div className="transaction-type">Withdraw USDT</div>
                                </td>
                                <td>
                                    #14525156
                                </td>
                                <td>
                                    Mar 21, 2022
                                </td>
                                <td>
                                    <TransactionTypeStatus transactionType="WITHDRAW_DECLINED" />
                                </td>
                                <td>
                                    0.0005
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <BalanceCryptoCurrencyIcon currency="USDTT" width={32} height={32} />
                                </td>
                                <td>
                                    <div className="amount">$659.10</div>
                                    <div className="transaction-type">Withdraw USDTT</div>
                                </td>
                                <td>
                                    #14525156
                                </td>
                                <td>
                                    Mar 21, 2022
                                </td>
                                <td>
                                    <TransactionTypeStatus transactionType="BONUS_CANCEL" />
                                </td>
                                <td>
                                    0.0005
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <BalanceCryptoCurrencyIcon currency="ETH" width={32} height={32} />
                                </td>
                                <td>
                                    <div className="amount">$659.10</div>
                                    <div className="transaction-type">Withdraw ETH</div>
                                </td>
                                <td>
                                    #14525156
                                </td>
                                <td>
                                    Mar 21, 2022
                                </td>
                                <td>
                                    <TransactionTypeStatus transactionType="WITHDRAW_REQUEST" />
                                </td>
                                <td>
                                    0.0005
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default RecentActivities;