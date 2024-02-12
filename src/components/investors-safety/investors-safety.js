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

                <p className="mini-title">
                    Investor safety.
                </p>

                <p className="description">
                    Proof launched tokens are built in a way that protects investors from the common scam tactics. Things like removing the liquidity, stopping sells, or infinite minting of supply — these are all impossible with PROOF. It means investors can invest more, with greater confidence.
                </p>

                <p className="mini-title">
                    Peace of mind.
                </p>

                <p className="description">
                    Investors can rest assured that your contract has been reviewed and audited by the best engineers in the business — SourceHat former Solidity Finance.
                </p>

                <hr />

                <div className="content">
                    <a href="https://www.proofplatform.io" className="item">
                        <img src="/pictures/background/investors-safety-1.png" alt="Proof Platform" width="260" height="208" loading="lazy" />

                        <div className="title-level-1">
                            Proof platform
                        </div>
                        <div className="title-level-2">
                            Battle tested bullet proof launch
                        </div>
                        <div className="description">
                            Proof platform crafted a full suite of tried and tested tools for launching your token, custom designed to maximize your chance of success.
                            PROOF has you covered all.
                        </div>
                    </a>

                    <a href="https://www.sourcehat.com" className="item">
                        <img src="/pictures/background/investors-safety-2.png" alt="Audited" width="260" height="208" loading="lazy" />

                        <div className="title-level-1">
                            Built, Tested, Audited
                        </div>
                        <div className="title-level-2">
                            Source Hat
                        </div>
                        <div className="description">
                            1700+ smart contract audits covering all major project types and protocols, securing a total of over $50 billion U.S. dollars in on-chain value.
                            Review of solidity code, no matter how complex.
                        </div>
                    </a>

                    <a href="https://www.assuredefi.com" className="item">
                        <img src="/pictures/background/investors-safety-3.png" alt="Kyc Verified" width="260" height="208" loading="lazy" />

                        <div className="title-level-1">
                            Kyc Verified
                        </div>
                        <div className="title-level-2">
                            The verification gold Standard&reg;
                        </div>
                        <div className="description">
                            Assure DeFi® is the market leader and pioneer of project KYC Verification and Code Audits.
                            Add Trust, Credibility and boost your visibility by getting verified today.
                        </div>
                    </a>

                    <a href="https://www.curacao-egaming.com" className="item">
                        <img src="/pictures/background/investors-safety-4.png" alt="Licensed Casino" width="260" height="208" loading="lazy" />

                        <div className="title-level-1">
                            Licensed Casino
                        </div>
                        <div className="title-level-2">
                            OPERATING UNDER Curaçao eGaming
                        </div>
                        <div className="description">
                            888BITS.COM is licensed and regulated by CyberLuck Curaçao N.V., Pareraweg 45, Willemstad, Curaçao, license no. 8048/JAZ1668-022.
                        </div>
                    </a>
                </div>

            </section >
        );
    }
}

export default InvestorsSafety;