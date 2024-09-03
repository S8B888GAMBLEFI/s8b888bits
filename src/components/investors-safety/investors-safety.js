import React from "react"

class InvestorsSafety extends React.Component {
    render = () => {
        return (
            <section className="investors-safety">
                <div className="header-section">
                    <h2 className="title">
                        Collaborative Forces
                    </h2>
                </div>

                <hr />

                <p className="mini-title">
                    Investor safety
                </p>

                <p className="description">
                    Proof launched tokens are built in a way that protects investors from the common scam tactics.
                    Things like removing the liquidity, stopping sells, or infinite minting of supply — these are all impossible with PROOF.
                    It means investors can invest more, with greater confidence.
                </p>

                <p className="mini-title">
                    Peace of mind
                </p>

                <p className="description">
                    Investors can rest assured that your contract has been reviewed and audited by the best engineers in the business —
                    SourceHat former Solidity Finance.
                </p>

                <div className="content">

                    <a href="https://s8b.888bits.com/static/docs/S8B888BITS-Smart-StakingContract-Audit-by-SourceHat.pdf" className="item">
                        <div className="image first">

                        </div>
                        {/*
                            <img src="/pictures/background/investors-safety-2.webp" alt="Audited" width="260" height="208" loading="lazy" />
                        */}

                        <div className="title-level-1">
                            Built, Tested, Audited
                        </div>
                        <div className="title-level-2">
                            Source Hat
                        </div>
                        <div className="description">
                            We've engaged SourceHat, renowned for developing and auditing over 1700 smart contracts across various project types and protocols,
                            securing over $50 billion in on-chain value.
                            SourceHat has handled the development, testing, and auditing of our contracts, <a href="https://sourcehat.com/audits/888Bits/">token</a>, and
                            &nbsp;<a href="https://sourcehat.com/audits/888BitsStaking/">staking contract</a>.
                        </div>
                    </a>

                    <a href="https://assuredefi.com/projects/888bits/" className="item">
                        <div className="image second">

                        </div>
                        {/*
                        <img src="/pictures/background/investors-safety-3.webp" alt="Kyc Verified" width="260" height="208" loading="lazy" />
                        */}

                        <div className="title-level-1">
                            Kyc Verified
                        </div>
                        <div className="title-level-2">
                            Gold Standard&reg;
                        </div>
                        <div className="description">
                            Our gambleFi platform has achieved the Gold Standard with Assure DeFi®,
                            the market leader in project KYC and code audits.
                            To further enhance trust, we've also engaged Assure DeFi as a second auditor to review our contracts and
                            all associated dApps with casino.
                        </div>
                    </a>

                    <a href="https://www.curacao-egaming.com" className="item">
                        <div className="image third">

                        </div>
                        {/*
                        <img src="/pictures/background/investors-safety-4.webp" alt="Licensed Casino" width="260" height="208" loading="lazy" />
                        */}

                        <div className="title-level-1">
                            Licensed Casino
                        </div>
                        <div className="title-level-2">
                            CURAçAO eGAMING
                        </div>
                        <div className="description">
                            Website 888BITS.COM is operated by SmartBits B.V., registration number 157320, at Pareraweg 45, Willemstad,
                            Curaçao, license no. 1668/JAZ.Spilux Innovation L.L.C-FZ is Service Provider of Operator and
                            the business partner providing exclusive access to S8B GambleFi Platform.
                        </div>
                    </a>

                    <a href="https://www.proofplatform.io" className="item">
                        <div className="image fourth">

                        </div>
                        {/*
                        <img src="/pictures/background/investors-safety-1.webp" alt="Proof Platform" width="260" height="208" loading="lazy" />
                        */}

                        <div className="title-level-1">
                            Proof platform
                        </div>
                        <div className="title-level-2">
                            BULLET PROOF LAUNCH
                        </div>
                        <div className="description">
                            We've partnered with Proof platform to ensure a secure and legitimate launch,
                            supported by their comprehensive suite of proven tools specifically designed to maximize the success of token launches.
                            PROOF has successfully launched dozens of tokens,
                            and we're excited to offer special opportunities to Proof Pass NFT holders on our platform.
                        </div>
                    </a>

                </div>

            </section >
        );
    }
}

export default InvestorsSafety;