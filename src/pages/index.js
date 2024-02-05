import React from "react";
import { injectIntl } from "gatsby-plugin-react-intl";
import Layout from "../components/layout/layout";
import SeoHead from "../components/seo-head";
import * as config from "../configuration/Config";

//import Account from "../components/account/account";
//import NftCard from "../components/nft-card/nft-card";

import FundsRaisingRounds from "../components/funds-raising-rounds/funds-raising-rounds";
//import ConnectYourWallet from "../components/connect-your-wallet/connect-your-wallet";
//import BuyTokens from "../components/buy-tokens/buy-tokens";

//import PrivateSaleStatus from "../components/private-sale-status/private-sale-status";
//import InvestorsVipNft from "../components/investors-vip-nft/investors-vip-nft";
import PresaleSeedRound from "../components/presale-seed-round/presale-seed-round";
import InvestorsSafety from "../components/investors-safety/investors-safety";

import Staking from "../components/staking/staking";


import SignupEmailForUpdates from "../components/signup-email-for-updates/signup-email-for-updates";

class IndexPage extends React.Component {

  render() {
    return (
      <Layout>
        <>
          <h1 className="display-none">{this.props.intl.formatMessage({ id: "Launchpad" })}</h1>
        </>

        <div className="portals">
          {/*}
          <div className="left">
            <Account />
            <NftCard />
          </div>
          */}
          <div className="center">
            <FundsRaisingRounds />
            {/*
            <ConnectYourWallet />
            */}
            {/*
            <BuyTokens />
            */}

            {/*
              <PrivateSaleStatus />
            */}
          </div>
          <div className="full-width">
            {/*
            <PresaleSeedRound />
            */}
            <InvestorsSafety />
            {
              /*
              <InvestorsVipNft />
              */
            }

            <Staking />
          </div>

        </div>

        <SignupEmailForUpdates />

      </Layout>
    )
  }
}

const hoc = (injectIntl(IndexPage));

export default hoc;

export const Head = () => (
  <SeoHead
    title="Launchpad"
    description="Explore the exhilarating world of online gambling at 888BITS online Casino, one-stop destination for crypto gambling. Enjoy a diverse range of casino games"
    keywords="888bits, Casino, Crypto, Slots, Live dealer, Virtual games, Instant games, Gamble, Crypto Casino Games, Crash Game, Bitcoin Gambling Games, Crypto Games, Ethereum Game, Bcgame, Crypto Gambling Games, Play Live Casino Online Free, Best Crypto Casino Games, Best Crypto Games, Online Crypto Casino Games, Online Blockchain Games, Online Casino Slot Games"
    ogTitle="Launchpad"
    ogDescription="Explore the exhilarating world of online gambling at 888BITS online Casino, one-stop destination for crypto gambling. Enjoy a diverse range of casino games"
    ogUrl={config.BASE_URL}
    twitterSite="@BITS888"
    twitterDescription="Explore the exhilarating world of online gambling at 888BITS online Casino, one-stop destination for crypto gambling. Enjoy a diverse range of casino games"
  />
)
