import React from "react";
import { injectIntl } from "gatsby-plugin-react-intl";
import Layout from "../components/layout/layout";
import SeoHead from "../components/seo-head";
import * as config from "../configuration/Config";

class ClaimRevenueSharePage extends React.Component {

    render() {
        return (
            <Layout>
                <>
                    <h1 className="display-none">Claim Revenue Share</h1>
                </>

                <br />
                Claim Revenue Share
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

            </Layout>
        )
    }
}

const hoc = (injectIntl(ClaimRevenueSharePage));

export default hoc;

export const Head = () => (
    <SeoHead
        title="Claim Revenue Share"
        description="Explore the exhilarating world of online gambling at 888BITS online Casino, one-stop destination for crypto gambling. Enjoy a diverse range of casino games"
        keywords="888bits, Casino, Crypto, Slots, Live dealer, Virtual games, Instant games, Gamble, Crypto Casino Games, Crash Game, Bitcoin Gambling Games, Crypto Games, Ethereum Game, Bcgame, Crypto Gambling Games, Play Live Casino Online Free, Best Crypto Casino Games, Best Crypto Games, Online Crypto Casino Games, Online Blockchain Games, Online Casino Slot Games"
        ogTitle="Claim Revenue Share"
        ogDescription="Explore the exhilarating world of online gambling at 888BITS online Casino, one-stop destination for crypto gambling. Enjoy a diverse range of casino games"
        ogUrl={config.BASE_URL}
        twitterSite="@BITS888"
        twitterDescription="Explore the exhilarating world of online gambling at 888BITS online Casino, one-stop destination for crypto gambling. Enjoy a diverse range of casino games"
    />
)
