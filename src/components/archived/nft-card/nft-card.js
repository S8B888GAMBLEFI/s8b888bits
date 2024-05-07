import React from "react";
import { FormattedMessage } from "gatsby-plugin-react-intl"
import {
    isMobile
} from "react-device-detect";

class NftCard extends React.Component {

    state = {

    }

    static propTypes = {
    }

    static defaultPropTypes = {

    }

    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        this._isMounted = true;

        window.addEventListener('resize', () => {
            this.setState({
                isMobile: isMobile
            })
        })
    }

    componentDidUpdate(prevProps, prevState) {


    }

    componentWillUnmount() {

    }

    render = () => {
        return (
            <div className="nft-card">
                <div className="title centered"><FormattedMessage id="NFTs" /></div>
                <div className="single-col">
                    <div className="col centered">
                        <img src="/pictures/image-icons/icon-nft-card.svg" alt="NFT" loading="lazy" />
                    </div>
                    <div className="col centered">
                        <div className="sol-section">
                            <div className="sol-value">
                                <img src="/pictures/wallet-crypto-currencies/icon-sol.svg" alt="SOL" width={30} height={30} loading="lazy" />
                                <div className="value">
                                    99.04 SOL
                                </div>
                            </div>
                            <img src="/pictures/account/dashboard/profile-default.svg" alt="Profile Default" width={40} height={40} loading="lazy" />
                        </div>
                    </div>
                    <div className="col centered">
                        <div className="username-section">
                            <div className="username">
                                AmnesiaBits
                            </div>

                            <img src="/pictures/image-icons/verification-status/kyc-verification-status.svg" alt="KYC" height={15} width={15} loading="lazy" />

                        </div>
                    </div>
                    <div className="col centered">
                        <div className="role">
                            888 Guardian
                        </div>
                    </div>
                    <div className="col centered">
                        <button type="button" className="btn list-nfts">
                            List
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default NftCard;