import React, { useMemo, useState, useEffect } from "react";
import useCurrentEpoch from '../../hooks/useCurrentEpoch';
import ProgressCountdown from './ProgressCountdown';
import { createGlobalStyle } from 'styled-components';
import moment from 'moment';
import CountUp from 'react-countup';
import useTreasuryAllocationTimes from '../../hooks/useTreasuryAllocationTimes';
import "./index.css";
import useBombStats from '../../hooks/useBombStats';
import { roundAndFormatNumber } from '../../0x';
import usebShareStats from '../../hooks/usebShareStats';
import HomeImage from '../../assets/img/background.jpg';
import useBondStats from '../../hooks/useBondStats';
import { getDisplayBalance } from '../../utils/formatBalance';
import useTokenBalance from '../../hooks/useTokenBalance';
import useBombFinance from '../../hooks/useBombFinance';
import useStatsForPool from '../../hooks/useStatsForPool';
import useBank from '../../hooks/useBank';
import useFetchBoardroomAPR from '../../hooks/useFetchBoardroomAPR';
import useTotalValueLocked from '../../hooks/useTotalValueLocked';
import useStakedTokenPriceInDollars from '../../hooks/useStakedTokenPriceInDollars';
import useEarnings from '../../hooks/useEarnings';
import useEarningsOnBoardroom from '../../hooks/useEarningsOnBoardroom';
import useTotalStakedOnBoardroom from '../../hooks/useTotalStakedOnBoardroom';
import useStakedBalance from '../../hooks/useStakedBalance';
import useShareStats from '../../hooks/usebShareStats';
import useStakedBalanceOnBoardroom from '../../hooks/useStakedBalanceOnBoardroom';
import bshares from '../../assets/img/bshares.png';
import bomb_bitcoin from '../../assets/img/bomb-bitcoin-LP.png';
import bbond from '../../assets/img/bbond-256.png';
import bshare_bnb_lp from '../../assets/img/bshare-bnb-lp-512.png';
import bomb_img from '../../assets/img/bomb.png';
import meta_fox from '../../assets/img/metamask-fox.svg';
import { Typography, Button } from '@material-ui/core';
import Page from "../../components/Page";
const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) repeat !important;
    background-size: cover !important;
    background-color: #171923;
  }
`;
const Dashboard = () => {
    const currentEpoch = useCurrentEpoch();
    const { to } = useTreasuryAllocationTimes();
    const bombStats = useBombStats();
    const bombTotalSupply = useMemo(() => (bombStats ? String(bombStats.totalSupply) : null), [bombStats]);
    const bShareStats = usebShareStats();
    const bShareTotalSupply = useMemo(() => (bShareStats ? String(bShareStats.totalSupply) : null), [bShareStats]);
    const tBondStats = useBondStats();
    const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);
    const bombCirculatingSupply = useMemo(() => (bombStats ? String(bombStats.circulatingSupply) : null), [bombStats]);
    const bShareCirculatingSupply = useMemo(
        () => (bShareStats ? String(bShareStats.circulatingSupply) : null),
        [bShareStats],
    );
    const tBondCirculatingSupply = useMemo(
        () => (tBondStats ? String(tBondStats.circulatingSupply) : null),
        [tBondStats],
    );

    const bondStat = useBondStats();
    const bombFinance = useBombFinance();
    const bondBalance = useTokenBalance(bombFinance?.BBOND);
    const bombPriceInDollars = useMemo(
        () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
        [bombStats],
    );
    const bSharePriceInDollars = useMemo(
        () => (bShareStats ? Number(bShareStats.priceInDollars).toFixed(2) : null),
        [bShareStats],
    );
    const tBondPriceInDollars = useMemo(
        () => (tBondStats ? Number(tBondStats.priceInDollars).toFixed(2) : null),
        [tBondStats],
    );
    const bombPriceInBNB = useMemo(() => (bombStats ? Number(bombStats.tokenInFtm).toFixed(4) : null), [bombStats]);
    const bSharePriceInBNB = useMemo(
        () => (bShareStats ? Number(bShareStats.tokenInFtm).toFixed(4) : null),
        [bShareStats],
    );
    const tBondPriceInBNB = useMemo(() => (tBondStats ? Number(tBondStats.tokenInFtm).toFixed(4) : null), [tBondStats]);

    useEffect(() => window.scrollTo(0, 0));

    //first bank id
    const bankId = "BombBtcbLPBShareRewardPool";
    const bank = useBank(bankId);


    let statsOnPool = useStatsForPool(bank);


    //second bank id
    const bankId_ = "BshareBnbLPBShareRewardPool";
    const bank_ = useBank(bankId_);
    let statsOnPool_ = useStatsForPool(bank_);
    const boardroomAPR = useFetchBoardroomAPR();
    const TVL_value = useTotalValueLocked();
    const earnings = useEarningsOnBoardroom();
    const tokenPriceInDollars = useMemo(
        () => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null),
        [bombStats],
      );
    const earnedInDollars = (Number(tokenPriceInDollars) * Number(getDisplayBalance(earnings))).toFixed(2);
    const totalStaked = useTotalStakedOnBoardroom();
    const stakedBalance = useStakedBalanceOnBoardroom();
    // const {bankId} = useParams();
    // const bank = useBank(bankId);


    //BOMB-BTCD
    const bombStats_BOMB_BTCD = useBombStats();
    const tShareStats_BOMB_BTCD = useShareStats();
    const earnings_BOMB_BTCD = useEarnings(bank.contract, bank.earnTokenName, bank.poolId);
    const tokenStats_BOMB_BTCD = bank.earnTokenName === 'BSHARE' ? tShareStats_BOMB_BTCD : bombStats_BOMB_BTCD;
    const tokenPriceInDollars_BOMB_BTCD = useMemo(
        () => (tokenStats_BOMB_BTCD ? Number(tokenStats_BOMB_BTCD.priceInDollars).toFixed(2) : null),
        [tokenStats_BOMB_BTCD],
      );
    const earnedInDollars_BOMB_BTCD = (Number(tokenPriceInDollars_BOMB_BTCD) * Number(getDisplayBalance(earnings_BOMB_BTCD))).toFixed(2);

    //YOUR STAKES
    const stakedBalance_BOMB_BTCD_STAKES = useStakedBalanceOnBoardroom();
    const stakedTokenPriceInDollars_BOMB_BTCD_STAKES = useStakedTokenPriceInDollars('BSHARE', bombFinance.BSHARE);
    const tokenPriceInDollars_BOMB_BTCD_STAKE = useMemo(
        () =>
          stakedTokenPriceInDollars_BOMB_BTCD_STAKES
            ? (Number(stakedTokenPriceInDollars_BOMB_BTCD_STAKES) * Number(getDisplayBalance(stakedBalance_BOMB_BTCD_STAKES))).toFixed(2).toString()
            : null,
        [stakedTokenPriceInDollars_BOMB_BTCD_STAKES, stakedBalance],
      );


    //BSHARE-BNB
    const bombStats_BSHARE_BNB = useBombStats();
    const tShareStats_BSHARE_BNB = useShareStats();
    const earnings_BSHARE_BNB = useEarnings(bank_.contract, bank_.earnTokenName, bank_.poolId);
    const tokenStats_BSHARE_BNB = bank_.earnTokenName === 'BSHARE' ? tShareStats_BSHARE_BNB : bombStats_BSHARE_BNB;
    const tokenPriceInDollars_BSHARE_BNB = useMemo(
        () => (tokenStats_BSHARE_BNB ? Number(tokenStats_BSHARE_BNB.priceInDollars).toFixed(2) : null),
        [tokenStats_BSHARE_BNB],
      );
    const earnedInDollars_BSHARE_BNB = (Number(tokenPriceInDollars_BSHARE_BNB) * Number(getDisplayBalance(earnings_BSHARE_BNB))).toFixed(2);

    //YOUR STAKES
    const stakedBalance_BSHARE_BNB_STAKES = useStakedBalanceOnBoardroom();
    const stakedTokenPriceInDollars_BSHARE_BNB_STAKES = useStakedTokenPriceInDollars('BSHARE', bombFinance.BSHARE);
    const tokenPriceInDollars_BSHARE_BNB_STAKE = useMemo(
        () =>
          stakedTokenPriceInDollars_BSHARE_BNB_STAKES
            ? (Number(stakedTokenPriceInDollars_BSHARE_BNB_STAKES) * Number(getDisplayBalance(stakedBalance_BSHARE_BNB_STAKES))).toFixed(2).toString()
            : null,
        [stakedTokenPriceInDollars_BSHARE_BNB_STAKES, stakedBalance],
      );
    return (
       <Page>
        <div className="App">
            <BackgroundImage />
            {/* section 1 */}
            <div className="section-1">
                <div className="section-1-header">
                    <h4>Bomb Finance Summary</h4>
                </div>
                <hr />

                <div className="container-section-1">
                    <div className="leftTable">
                        <div class="row">
                            <div class="col">
                                {/* 1 of 2 */}
                                <table class="table-dark" id="leftTableid">
                                    <thead>
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col">Current Supply</th>
                                            <th scope="col">Total Supply</th>
                                            <th scope="col">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row"><img src={bomb_img} className="table_img" /> $BOMB</th>
                                            <td>{roundAndFormatNumber(bombCirculatingSupply, 2)}</td>
                                            <td>{roundAndFormatNumber(bombTotalSupply, 2)}</td>
                                            <td>${bombPriceInDollars ? roundAndFormatNumber(bombPriceInDollars, 2) : '-.--'}
                                                <div className="table-el">{bombPriceInBNB ? bombPriceInBNB : '-.----'} BTCB</div>
                                            </td>
                                            <td>
                                                <Button
                                                    onClick={() => {
                                                        bombFinance.watchAssetInMetamask('BOMB');
                                                    }}
                                                >
                                                    <img alt="metamask fox" style={{ width: '20px' }} src={meta_fox} />
                                                </Button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row"><img src={bshares} className="table_img" />$BSHARE</th>
                                            <td>{roundAndFormatNumber(bShareCirculatingSupply, 2)}</td>
                                            <td>{roundAndFormatNumber(bShareTotalSupply, 2)}</td>
                                            <td>${bSharePriceInDollars ? bSharePriceInDollars : '-.--'}
                                                <div className="table-el">{bSharePriceInBNB ? bSharePriceInBNB : '-.----'}  BTCB</div>
                                            </td>
                                            <td>
                                            <Button
                                                    onClick={() => {
                                                        bombFinance.watchAssetInMetamask('BSHARE');
                                                    }}
                                                >
                                                    <img alt="metamask fox" style={{ width: '20px' }} src={meta_fox} />
                                                </Button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row"><img src={bbond} className="table_img" />$BBOND</th>
                                            <td>{roundAndFormatNumber(tBondCirculatingSupply, 2)}</td>
                                            <td>{roundAndFormatNumber(tBondTotalSupply, 2)}</td>
                                            <td>${tBondPriceInDollars ? tBondPriceInDollars : '-.--'}
                                                <div className="table-el">{tBondPriceInBNB ? tBondPriceInBNB : '-.----'} BTCB</div>
                                            </td>
                                            <td>
                                            <Button
                                                    onClick={() => {
                                                        bombFinance.watchAssetInMetamask('BBOND');
                                                    }}
                                                >
                                                    <img alt="metamask fox" style={{ width: '20px' }} src={meta_fox} />
                                                </Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="rightTable">
                        <div className="right-right-allign">
                            <div className="currEpoch">
                                <div className="key">Current Epoch</div>
                                <div className="value">{Number(currentEpoch)}</div>
                            </div>
                            <hr />
                            <div className="nextEpochIn">
                                <div className="value"><ProgressCountdown base={moment().toDate()} hideBar={true} deadline={to} description="Next Epoch" /></div>
                                <div className="key">Next Epoch in</div>

                            </div>
                            <hr />
                            <div className="key2">Live TWAP: 1.17</div>
                            <div className="key2">TVL: <CountUp end={TVL_value} separator="," prefix="$" /></div>
                            <div className="key2">Last Epoch TWAP: 1.22</div>
                        </div>
                    </div>

                </div>
            </div>

            {/* section 2 */}
            <div className="xyz">

                <div className="section-2-1">

                    <div className="section-2-header">
                        <h4>Read investment strategy</h4>
                    </div>

                    <div className="sec2-1-2">
                        <div className="sub-sub-div-1">
                            <div className="investNow">Invest now</div>
                            <div className="chats">
                                <div className="discord">Chat on discord</div>
                                <div className="docs">read docs</div>
                            </div>
                        </div>
                    </div>
                    <div className="subdiv-1">

                        <div className="larger">
                            <div className="larger-parent-div">
                                <div className="bshare_image">
                                    <img src={bshares} alt="bshare-logo" className="bshare-image-id" />
                                </div>
                                <div className="larger-subdiv">
                                    <div className="Boardroom">Boardroom</div>
                                    <div className="Boardroom-below">
                                        <div className="Boardroom-below-disc">Stake BSHARE and earn BOMB every epoch</div>
                                        <div className="TVL">TVL: $1,008,430</div>
                                    </div>

                                </div>

                            </div>
                            <hr />
                            <div className="Total-soaked">Total Staked: {getDisplayBalance(totalStaked)}</div>

                            <div className="sec2final">
                                <div className="grid">
                                    <table class="table-dark" id="sec2table">
                                        <thead>
                                            <tr>
                                                <th scope="col"></th>
                                                <th scope="col">Daily Returns</th>
                                                <th scope="col">Your stake</th>
                                                <th scope="col">Earned</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td></td>
                                                <td>{Math.round(boardroomAPR.toFixed(2) / 365)}%</td>
                                                <td>{getDisplayBalance(stakedBalance)} {`≈ $${tokenPriceInDollars}`}</td>
                                                <td>{getDisplayBalance(earnings)} {`≈ $${earnedInDollars}`}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="functions">
                                    <div className="transaction">
                                        <div className="deposit">deposit</div>
                                        <div className="withdraw">withdraw</div>
                                    </div>
                                    <div className="rewards">Claim rewards</div>
                                </div>
                            </div>
                        </div>


                    </div>

                </div>


                <div className="section-2-2">
                    <div className="LatestNews">
                        <h4>Latest News</h4>
                    </div>
                </div>
            </div>

            {/* section 3 */}
            <div className="Section-3">
                <div className="s3-div1">

                    <div className="s3-div1-left">
                        <div className="bombFarms">Bomb Farms</div>
                        <div className="bombFarms-disc">Stake your LP tokens in our farms to start earning $BSHARE</div>
                    </div>
                    <div className="s3-div1-right">
                        <div className="claim-all">Claim all</div>
                    </div>
                </div>

                <div className="s3-div2">
                    <div className="s3_div2-header">
                        <div className="image-div-bomb-btcd">
                            <img src={bomb_bitcoin} className="bomb-btcd-image-id" />
                        </div>
                        <div className="Boardroom">BOMB-BTCD</div>
                        <div className="TVL">TVL: ${statsOnPool?.TVL}</div>
                    </div>
                    <hr />
                    <div className="s3_div2-content">
                        <div className="s3-div2-content-table">
                            <table class="table-dark" id="sec3table">
                                <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">Daily Returns</th>
                                        <th scope="col">Your stake</th>
                                        <th scope="col">Earned</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td>{bank.closedForStaking ? '0.00' : statsOnPool?.dailyAPR}%</td>
                                        <td>{getDisplayBalance(stakedBalance_BOMB_BTCD_STAKES)} {`≈ $${tokenPriceInDollars_BOMB_BTCD_STAKE}`}</td>
                                        <td> {getDisplayBalance(earnings_BOMB_BTCD)} {`≈ $${earnedInDollars_BOMB_BTCD}`}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="s3-div2-content-buttons">
                            <div className="sec3-deposit">
                                <div className="box-div">Deposit</div>
                            </div>
                            <div className="sec3-withdraw">Withdraw</div>
                            <div className="sec3-rewards">Rewards</div>
                        </div>
                    </div>
                </div>
                <div className="s3-div3">
                    <div className="s3_div2-header">
                        <div className="image-div-bomb-btcd">
                            <img src={bshare_bnb_lp} className="bomb-btcd-image-id" />
                        </div>
                        <div className="Boardroom">BSHARE-BNB</div>
                        <div className="TVL">TVL: ${statsOnPool_?.TVL}</div>
                    </div>
                    <hr />
                    <div className="s3_div2-content">
                        <div className="s3-div2-content-table">
                            <table class="table-dark" id="sec3table">
                                <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">Daily Returns</th>
                                        <th scope="col">Your stake</th>
                                        <th scope="col">Earned</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td>{bank_.closedForStaking ? '0.00' : statsOnPool_?.dailyAPR}%</td>
                                        <td>{getDisplayBalance(stakedBalance_BSHARE_BNB_STAKES)} {`≈ $${tokenPriceInDollars_BSHARE_BNB_STAKE}`}</td>
                                        <td> {getDisplayBalance(earnings_BSHARE_BNB)} {`≈ $${earnedInDollars_BSHARE_BNB}`}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="s3-div2-content-buttons">
                            <div className="sec3-deposit">Deposit</div>
                            <div className="sec3-withdraw">Withdraw</div>
                            <div className="sec3-rewards">Rewards</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* section 4 */}
            <div className="section-4">
                <div className="s4-header">
                    <div className="bbond-img">
                        <img src={bbond} className="s4-bbond-img" />
                    </div>
                    <div className="s4-header-content">
                        <div className="Bonds">Bonds</div>
                        <div className="Bonds-disc">BBOND can be purchased only on contraction periods, when TWAP of BOMB is below 1</div>
                    </div>
                </div>

                <div className="s4-content">
                    <div className="s4-content-left">
                        <div className="s4-content-left-left">
                            <div className="s4-content-left-left-top">Current Price: (Bomb)^2</div>
                            <div className="s4-content-left-left-bottom">BBond = {Number(bondStat?.tokenInFtm).toFixed(4) || '-'}</div>
                        </div>
                        <div className="s4-content-left-right">
                            <div className="s4-content-left-left-top">Available to redeem:</div>
                            <div className="s4-content-left-left-bottom">
                                <div className="s4-content-left-left-bottom-img">
                                    <img src={bbond} className="s4-bbond-img" />
                                </div>
                                <div className="s4-content-left-left-bottom-value">{getDisplayBalance(bondBalance)}</div>
                            </div>
                        </div>
                    </div>
                    <div className="s4-content-right">
                        <div className="purchase-BBond">
                            <div className="purchase-BBond-content">
                                <div className="purchase-BBond-content-content">Purchase BBond</div>
                                <div className="purchase-BBond-content-content">Bomb is over peg</div>
                            </div>
                            <div className="purchase-BBond-button">Purchase</div>
                        </div>
                        <hr />
                        <div className="Redeem-Bomb">
                            <div className="purchase-BBond-content-content">Redeem Bomb</div>
                            <div className="purchase-BBond-button">Redeem</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </Page>
    );
}

export default Dashboard