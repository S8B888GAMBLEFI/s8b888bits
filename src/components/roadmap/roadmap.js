import React from "react";

class Roadmap extends React.Component {

    render = () => {
        return (
            <div className="roadmap">
                <div className="header-section">
                    <div className="title">
                        Roadmap
                    </div>

                    <hr />
                </div>

                <div className="roadmap-flex">
                    <div className="item">
                        <div className="title">
                            Phase 1.
                        </div>
                        <div className="status finished">
                            Finished
                        </div>
                        <div className="description">
                            <ul>
                                <li>Build own casino software</li>
                                <li>Integrate major crypto currencies</li>
                                <li>Audit software / Games</li>
                                <li>Obtain Licenses (Curacao eGaming, Cyprus)</li>
                                <li>Onboard 3K players</li>
                                <li>Min wager per month 2.5M</li>
                                <li>Establish social media presence on platforms Twitter, Telegram</li>
                            </ul>
                        </div>
                    </div>
                    <div className="item">
                        <div className="title">
                            Phase 2.
                        </div>
                        <div className="status finished">
                            Finished
                        </div>
                        <div className="description">
                            <ul>
                                <li>Establish GambleFi Developers Partnerships</li>
                                <li>Token Contract Development (SourceHat)</li>
                                <li>Staking, Rewards Contract Development (SourceHat)</li>
                                <li>KYC Teams</li>
                                <li>Audit Contracts with 2 independent Auditors</li>
                                <li>Initiate Presale Rounds</li>
                                <li>Brand Design System V2</li>
                                <li>Start Building Community</li>
                                <li>Onboard KOLs - 6/12 months deals</li>
                            </ul>
                        </div>
                    </div>
                    <div className="item">
                        <div className="title">
                            Phase 3.
                        </div>
                        <div className="status active">
                            Active
                        </div>
                        <div className="description">
                            <ul>
                                <li>Publish Design System V2</li>
                                <li>Token Launch with ProofPlatform</li>
                                <li>Community Building</li>
                                Expand social media presence on Reddit, Bitcointalk, Discord.
                                Engage with the community through regular updates, and support al all comms channels.
                                <li>Announce Partnerships and Collaborations</li>
                                - Forge partnerships with relevant projects, influencers, and industry players.
                                - Collaborate on joint initiatives, events or marketing campaigns to expand the token's reach.
                                <li>Announcing Utils and Benefits</li>
                                Wheel of Dragon - First Burn Supply Event, Prize pool in USDC and more...
                            </ul>
                        </div>
                    </div>
                    <div className="item">
                        <div className="title">
                            Phase 4.
                        </div>
                        <div className="status in-progress">
                            Backlog, In Progress
                        </div>
                        <div className="description">
                            <ul>
                                <li>Mint first NFT Collection on Solana</li>
                                <li>Continuous Monitoring, Development and Optimization.</li>
                                <li>Monitor Casino KPIs as well website traffic, social media engagement, and token metrics.</li>
                                <li>Listen feedback from the community and holder to refine marketing strategies and improve the token's positioning.</li>
                            </ul>
                        </div>
                    </div>
                    <div className="item">
                        <div className="title">
                            Phase 5.
                        </div>
                        <div className="status not-active">
                            Not Active
                        </div>
                        <div className="description">
                            <ul>
                                <li>CEX Token Listings</li>
                                Secure listings on CEX exchanges to increase liquidity and accessibility.
                                <li>Implement strategies to drive trading volume and liquidity on these platforms.</li>
                            </ul>
                        </div>
                    </div>
                    <div className="item">
                        <div className="title">
                            Phase 6.
                        </div>
                        <div className="status tba">
                            TBA
                        </div>
                        <div className="description">
                            <ul>
                                <li>More into blockchains</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Roadmap;