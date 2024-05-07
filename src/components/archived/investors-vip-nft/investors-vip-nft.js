import React from "react"

class InvestorsVipNft extends React.Component {

    render = () => {
        return (
            <section className="investors-vip-nft">
                <div className="header-section">
                    <h2 className="title">
                        Investors VIP NFT
                    </h2>
                </div>

                <p className="description">
                    Each investors tier brings your special place among elite, exclusive perks, unparalleled privileges and more...
                </p>

                <div className="vip-levels">
                    <div className="content">
                        <div className="item">
                            <div className="price-range">
                                Over $500.00
                            </div>
                            <div className="vip-level">
                                VIP-Bronze
                            </div>
                            <div className="minted-info">
                                Minted 11/50
                            </div>
                            <div className="dark-line"></div>
                            <div className="light-line"></div>
                        </div>
                        <div className="item">
                            <div className="price-range">
                                Over $1,000.00
                            </div>
                            <div className="vip-level">
                                VIP-Silver
                            </div>
                            <div className="minted-info">
                                Minted 11/50
                            </div>
                            <div className="dark-line"></div>
                            <div className="light-line"></div>
                        </div>
                        <div className="item">
                            <div className="price-range">
                                Over $2,000.00
                            </div>
                            <div className="vip-level">
                                VIP-Gold
                            </div>
                            <div className="minted-info">
                                Minted 11/50
                            </div>
                            <div className="dark-line"></div>
                            <div className="light-line"></div>
                        </div>
                        <div className="item">
                            <div className="price-range">
                                Over $5,000.00
                            </div>
                            <div className="vip-level">
                                VIP-Platinum
                            </div>
                            <div className="minted-info">
                                Minted 11/50
                            </div>
                            <div className="dark-line"></div>
                            <div className="light-line"></div>
                        </div>
                        <div className="item">
                            <div className="price-range">
                                Over $10,000.00
                            </div>
                            <div className="vip-level">
                                VIP-Diamond
                            </div>
                            <div className="minted-info">
                                Minted 11/50
                            </div>
                            <div className="dark-line"></div>
                            <div className="light-line"></div>
                        </div>
                    </div>
                </div>

                <div className="header-section">
                    <div className="title">
                        Visit our OpenSea Store
                    </div>
                </div>

                <p className="description">
                    Each investors tier brings your special place among elite, exclusive perks, unparalleled privileges and more...
                </p>

                <div className="visit-opensea-store">
                    <div className="avatar"></div>

                    <div className="social-links">
                        <div className="item">
                            <button type="button">
                                <img src="/pictures/image-icons/icon-ship.svg" alt="Ship" height={24} width={24} loading="lazy" />
                            </button>
                        </div>
                        <div className="item">
                            <button type="button">
                                <img src="/pictures/image-icons/icon-share.svg" alt="Share" height={24} width={24} loading="lazy" />
                            </button>
                        </div>
                        <div className="item">
                            <button type="button">
                                <img src="/pictures/image-icons/icon-more.svg" alt="More" height={24} width={24} loading="lazy" />
                            </button>
                        </div>
                        <div className="item">
                            <button type="button">
                                <img src="/pictures/image-icons/icon-star.svg" alt="Star" height={24} width={24} loading="lazy" />
                            </button>
                        </div>
                    </div>
                </div>

            </section>
        );
    }
}

export default InvestorsVipNft;