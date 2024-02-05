import React from "react"
import BalanceCryptoCurrencyIcon from "../currency-icon/balance-crypto-currency-icon";
import CurrencyName from "../currency-symbol/currency-name";
import TransactionTypeStatus from "../transaction_type/transaction-type-status";

class Staking extends React.Component {

    render = () => {
        return (
            <section className="staking-section">

                <div className="header-section">
                    <div className="title">
                        <img src="/pictures/image-icons/bank-line.svg" width="24" height="24" alt="Bank" />
                        &nbsp;&nbsp;
                        $S8B Staking
                    </div>

                    <hr />

                    <div className="description">
                        Build your 401 Pension FUNDSSS HEREEEE BITCHEEES
                    </div>
                </div>

                <hr />

                <div className="balance-and-statistics">
                    <div className="item">
                        <img src="/pictures/wallet-crypto-currencies/icon-s8b.svg" alt="S8B" width="48" height="48" />
                        <span className="description">
                            Balance
                        </span>
                        <span className="balance">
                            $5,750,20
                        </span>
                    </div>
                    <div className="item">
                        <img src="/pictures/wallet-crypto-currencies/icon-s8b.svg" alt="S8B" width="48" height="48" />
                        <span className="description">
                            Total Staked
                        </span>
                        <span className="balance">
                            $5,750,20
                        </span>
                    </div>
                    <div className="item">
                        <img src="/pictures/wallet-crypto-currencies/icon-s8b.svg" alt="S8B" width="48" height="48" />
                        <span className="description">
                            Daily APR
                        </span>
                        <span className="balance">
                            422.34%
                        </span>
                    </div>
                    <div className="item">
                        <img src="/pictures/wallet-crypto-currencies/icon-s8b.svg" alt="S8B" width="48" height="48" />
                        <span className="description">
                            APR
                        </span>
                        <span className="balance">
                            422.34%
                        </span>
                    </div>
                </div>

                <hr />

                <div className="stake-and-unstake">
                    <div className="stake">
                        <div className="title">
                            Stake
                        </div>
                        <p className="description">
                            Build your 401 Pension FUNDSSS HEREEEE BITCHEEES
                            Build your 401 Pension FUNDSSS HEREEEE BITCHEEES
                            Build your 401 Pension FUNDSSS HEREEEE BITCHEEES
                        </p>

                        <div className="stake-amount">
                            <div className="currency-container">
                                <div className="currency-box">
                                    {
                                        <BalanceCryptoCurrencyIcon currency="S8B" width={35} height={35} />
                                    }
                                    {
                                        <CurrencyName currency="S8B" />
                                    }
                                </div>
                            </div>
                            <input type="number" className="amount" placeholder="Enter Stake Amount"
                                maxLength={10}
                                autoComplete="new-password"
                                min="0.0000001"
                                step="0.0000001"
                            />
                        </div>

                        <div className="button-actions">

                            <button type="button" className="btn stake-max" onClick={(event) => {
                                event.preventDefault();
                                //this.getExchangeRate();
                            }}>
                                Stake Max
                            </button>
                            <button type="button" className="btn approve" onClick={(event) => {
                                event.preventDefault();
                                //this.getExchangeRate();
                            }}>
                                Approve
                            </button>
                            <button type="button" className="btn claim" onClick={(event) => {
                                event.preventDefault();
                                //this.getExchangeRate();
                            }}>
                                Claim
                            </button>
                        </div>
                    </div>
                    <div className="unstake">
                        <div className="title">
                            Stake
                        </div>
                        <p className="description">
                            Build your 401 Pension FUNDSSS HEREEEE BITCHEEES
                            Build your 401 Pension FUNDSSS HEREEEE BITCHEEES
                            Build your 401 Pension FUNDSSS HEREEEE BITCHEEES
                        </p>

                        <div className="stake-amount">
                            <div className="currency-container">
                                <div className="currency-box">
                                    {
                                        <BalanceCryptoCurrencyIcon currency="S8B" width={35} height={35} />
                                    }
                                    {
                                        <CurrencyName currency="S8B" />
                                    }
                                </div>
                            </div>

                            <input type="number" className="amount" placeholder="Enter Stake Amount"
                                maxLength={10}
                                autoComplete="new-password"
                                min="0.0000001"
                                step="0.0000001"
                            />
                        </div>

                        <div className="button-actions">

                            <button type="button" className="btn stake-max" onClick={(event) => {
                                event.preventDefault();
                                //this.getExchangeRate();
                            }}>
                                Stake Max
                            </button>
                            <button type="button" className="btn approve" onClick={(event) => {
                                event.preventDefault();
                                //this.getExchangeRate();
                            }}>
                                Approve
                            </button>
                            <button type="button" className="btn claim" onClick={(event) => {
                                event.preventDefault();
                                //this.getExchangeRate();
                            }}>
                                Claim
                            </button>
                        </div>
                    </div>
                </div>

                <hr />

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
                                        <BalanceCryptoCurrencyIcon currency="BTC" />
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
                                        <BalanceCryptoCurrencyIcon currency="USDT" />
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
                                        <TransactionTypeStatus transactionType="AFF_PL_TO" />
                                    </td>
                                    <td>
                                        0.0005
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <BalanceCryptoCurrencyIcon currency="USDTT" />
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
                                        <TransactionTypeStatus transactionType="AFF_PL_TO" />
                                    </td>
                                    <td>
                                        0.0005
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <BalanceCryptoCurrencyIcon currency="ETH" />
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
            </section >
        );
    }
}

export default Staking;