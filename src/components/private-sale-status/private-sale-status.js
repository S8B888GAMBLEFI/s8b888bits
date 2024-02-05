import React from "react"

class PrivateSaleStatus extends React.Component {

    render = () => {
        return (
            <section className="private-sale-status">
                <div className="header-section">
                    <div className="title">
                        Private sale status
                    </div>
                </div>
                <p className="description">
                    Prior to its launch, you have the opportunity to purchase $S8B on its most offordable price during the private sale phase.
                    Beside that lifetime VIP status will be activated with NFTs.
                </p>
                <hr />
                <div className="main-section">
                    <div className="content">
                        <div className="headline">
                            $USDC 55,750,20
                        </div>
                        <div className="participants">
                            3245 Participants
                        </div>

                        <div className="raised">
                            21% of $888,888.00 raised
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default PrivateSaleStatus;