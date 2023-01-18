import React, { useMemo, useState } from "react";
import useCurrentEpoch from '../../hooks/useCurrentEpoch';
import ProgressCountdown from './ProgressCountdown';
import { createGlobalStyle } from 'styled-components';
import moment from 'moment';
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
    return (

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
                                            <th scope="row">$BOMB</th>
                                            <td>{roundAndFormatNumber(bombCirculatingSupply, 2)}</td>
                                            <td>{roundAndFormatNumber(bombTotalSupply, 2)}</td>
                                            <td>${bombPriceInDollars ? roundAndFormatNumber(bombPriceInDollars, 2) : '-.--'}
                                                <div className="table-el">{bombPriceInBNB ? bombPriceInBNB : '-.----'} BTCB</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">$BSHARE</th>
                                            <td>{roundAndFormatNumber(bShareCirculatingSupply, 2)}</td>
                                            <td>{roundAndFormatNumber(bShareTotalSupply, 2)}</td>
                                            <td>${bSharePriceInDollars ? bSharePriceInDollars : '-.--'}
                                                <div className="table-el">{bSharePriceInBNB ? bSharePriceInBNB : '-.----'}  BTCB</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">$BBOND</th>
                                            <td>{roundAndFormatNumber(tBondCirculatingSupply, 2)}</td>
                                            <td>{roundAndFormatNumber(tBondTotalSupply, 2)}</td>
                                            <td>${tBondPriceInDollars ? tBondPriceInDollars : '-.--'}
                                                <div className="table-el">{tBondPriceInBNB ? tBondPriceInBNB : '-.----'} BTCB</div>
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
                            <div className="key2">TVL: $5,002,412</div>
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
                            <div className="larger-subdiv">
                                <div className="Boardroom">Boardroom</div>
                                <div className="Boardroom-below">
                                    <div className="Boardroom-below-disc">Stake BSHARE and earn BOMB every epoch</div>
                                    <div className="TVL">TVL: $1,008,430</div>

                                </div>
                            </div>
                            <hr />
                            <div className="Total-soaked">Total Staked: 7232</div>

                            <div className="sec2final">
                                <div className="grid">
                                    <table class="table-dark" id="sec2table">
                                        <thead>
                                            <tr>
                                                <th scope="col"></th>
                                                <th scope="col">Daily Returns</th>
                                                <th scope="col">Your stake</th>
                                                <th scope="col">Returns</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td></td>
                                                <td>2%</td>
                                                <td>6.0000 ≈ $1171.62</td>
                                                <td> 1660.4413 ≈ $298.88</td>
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
                        <div className="Boardroom">BOMB-BTCD</div>
                        <div className="TVL">TVL: $1,008,430</div>
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
                                        <th scope="col">Returns</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td>2%</td>
                                        <td>6.0000 ≈ $1171.62</td>
                                        <td> 1660.4413 ≈ $298.88</td>
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
                        <div className="Boardroom">BSHARE-BNB</div>
                        <div className="TVL">TVL: $1,008,430</div>
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
                                        <th scope="col">Returns</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td>2%</td>
                                        <td>6.0000 ≈ $1171.62</td>
                                        <td> 1660.4413 ≈ $298.88</td>
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
                    <div className="Bonds">Bonds</div>
                    <div className="Bonds-disc">BBOND can be purchased only on contraction periods, when TWAP of BOMB is below 1</div>
                </div>

                <div className="s4-content">
                    <div className="s4-content-left">
                        <div className="s4-content-left-left">
                            <div className="s4-content-left-left-top">Current Price: (Bomb)^2</div>
                            <div className="s4-content-left-left-bottom">BBond = {Number(bondStat?.tokenInFtm).toFixed(4) || '-'}</div>
                        </div>
                        <div className="s4-content-left-right">
                            <div className="s4-content-left-left-top">Available to redeem:</div>
                            <div className="s4-content-left-left-bottom">{getDisplayBalance(bondBalance)}</div>
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

    );
}

export default Dashboard