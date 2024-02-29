import React from "react";
import { injectIntl } from "gatsby-plugin-react-intl";
import Layout from "../components/layout/layout";
import SeoHead from "../components/seo-head";
import * as config from "../configuration/Config";


import Account from "../components/shared/account/account";
import Wallet from "../components/shared/wallet/wallet"
import Staking from "../components/staking/staking";


class StakingPage extends React.Component {

    render() {
        return (
            <Layout>
                <>
                    <h1 className="display-none">Staking</h1>
                </>

                {
                    config.ENVIRONMENT_SITE === "LIVE" &&
                    <>
                        <br />
                        Staking
                        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                    </>
                }


                {
                    (config.ENVIRONMENT_SITE === "DEV" || config.ENVIRONMENT_SITE === "UAT") &&
                    <div className="portals">

                        <div className="left">
                            <Account />
                            <Wallet />
                        </div>

                        <div className="center">
                            <Staking />
                        </div>
                    </div>
                }

            </Layout>
        )
    }
}

const hoc = (injectIntl(StakingPage));

export default hoc;

export const Head = () => (
    <SeoHead
        title="Staking"
        description="Explore the exhilarating world of online gambling at 888BITS online Casino, one-stop destination for crypto gambling. Enjoy a diverse range of casino games"
        keywords="888bits, Casino, Crypto, Slots, Live dealer, Virtual games, Instant games, Gamble, Crypto Casino Games, Crash Game, Bitcoin Gambling Games, Crypto Games, Ethereum Game, Bcgame, Crypto Gambling Games, Play Live Casino Online Free, Best Crypto Casino Games, Best Crypto Games, Online Crypto Casino Games, Online Blockchain Games, Online Casino Slot Games"
        ogTitle="Staking"
        ogDescription="Explore the exhilarating world of online gambling at 888BITS online Casino, one-stop destination for crypto gambling. Enjoy a diverse range of casino games"
        ogUrl={config.BASE_URL}
        twitterSite="@BITS888"
        twitterDescription="Explore the exhilarating world of online gambling at 888BITS online Casino, one-stop destination for crypto gambling. Enjoy a diverse range of casino games"
    />
)
