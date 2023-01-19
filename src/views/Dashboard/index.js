import React, { useMemo, useState, useEffect } from "react";
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
import useStatsForPool from '../../hooks/useStatsForPool';
import useBank from '../../hooks/useBank';
import useFetchBoardroomAPR from '../../hooks/useFetchBoardroomAPR';
import bshares from '../../assets/img/bshares.png';
import bomb_bitcoin from '../../assets/img/bomb-bitcoin-LP.png';
import bbond from '../../assets/img/bbond-256.png';
import bshare_bnb_lp from '../../assets/img/bshare-bnb-lp-512.png';
import bomb_img from '../../assets/img/bomb.png';
import { Typography } from '@material-ui/core';
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
    const bankId = "BombBtcbLPBShareRewardPool";
    const bank = useBank(bankId);
    let statsOnPool = useStatsForPool(bank);

    const bankId_ = "BshareBnbLPBShareRewardPool";
    const bank_ = useBank(bankId_);
    let statsOnPool_ = useStatsForPool(bank_);
    const boardroomAPR = useFetchBoardroomAPR();
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
                                            <th scope="row"><img src={bomb_img} className="table_img"/> $BOMB</th>
                                            <td>{roundAndFormatNumber(bombCirculatingSupply, 2)}</td>
                                            <td>{roundAndFormatNumber(bombTotalSupply, 2)}</td>
                                            <td>${bombPriceInDollars ? roundAndFormatNumber(bombPriceInDollars, 2) : '-.--'}
                                                <div className="table-el">{bombPriceInBNB ? bombPriceInBNB : '-.----'} BTCB</div>
                                            </td>
                                            <td><svg fill="none" height="33" viewBox="0 0 35 33" width="35" xmlns="http://www.w3.org/2000/svg"><g stroke-linecap="round" stroke-linejoin="round" stroke-width=".25"><path d="m32.9582 1-13.1341 9.7183 2.4424-5.72731z" fill="#e17726" stroke="#e17726" /><g fill="#e27625" stroke="#e27625"><path d="m2.66296 1 13.01714 9.809-2.3254-5.81802z" /><path d="m28.2295 23.5335-3.4947 5.3386 7.4829 2.0603 2.1436-7.2823z" /><path d="m1.27281 23.6501 2.13055 7.2823 7.46994-2.0603-3.48166-5.3386z" /><path d="m10.4706 14.5149-2.0786 3.1358 7.405.3369-.2469-7.969z" /><path d="m25.1505 14.5149-5.1575-4.58704-.1688 8.05974 7.4049-.3369z" /><path d="m10.8733 28.8721 4.4819-2.1639-3.8583-3.0062z" /><path d="m20.2659 26.7082 4.4689 2.1639-.6105-5.1701z" /></g><path d="m24.7348 28.8721-4.469-2.1639.3638 2.9025-.039 1.231z" fill="#d5bfb2" stroke="#d5bfb2" /><path d="m10.8732 28.8721 4.1572 1.9696-.026-1.231.3508-2.9025z" fill="#d5bfb2" stroke="#d5bfb2" /><path d="m15.1084 21.7842-3.7155-1.0884 2.6243-1.2051z" fill="#233447" stroke="#233447" /><path d="m20.5126 21.7842 1.0913-2.2935 2.6372 1.2051z" fill="#233447" stroke="#233447" /><path d="m10.8733 28.8721.6495-5.3386-4.13117.1167z" fill="#cc6228" stroke="#cc6228" /><path d="m24.0982 23.5335.6366 5.3386 3.4946-5.2219z" fill="#cc6228" stroke="#cc6228" /><path d="m27.2291 17.6507-7.405.3369.6885 3.7966 1.0913-2.2935 2.6372 1.2051z" fill="#cc6228" stroke="#cc6228" /><path d="m11.3929 20.6958 2.6242-1.2051 1.0913 2.2935.6885-3.7966-7.40495-.3369z" fill="#cc6228" stroke="#cc6228" /><path d="m8.392 17.6507 3.1049 6.0513-.1039-3.0062z" fill="#e27525" stroke="#e27525" /><path d="m24.2412 20.6958-.1169 3.0062 3.1049-6.0513z" fill="#e27525" stroke="#e27525" /><path d="m15.797 17.9876-.6886 3.7967.8704 4.4833.1949-5.9087z" fill="#e27525" stroke="#e27525" /><path d="m19.8242 17.9876-.3638 2.3584.1819 5.9216.8704-4.4833z" fill="#e27525" stroke="#e27525" /><path d="m20.5127 21.7842-.8704 4.4834.6236.4406 3.8584-3.0062.1169-3.0062z" fill="#f5841f" stroke="#f5841f" /><path d="m11.3929 20.6958.104 3.0062 3.8583 3.0062.6236-.4406-.8704-4.4834z" fill="#f5841f" stroke="#f5841f" /><path d="m20.5906 30.8417.039-1.231-.3378-.2851h-4.9626l-.3248.2851.026 1.231-4.1572-1.9696 1.4551 1.1921 2.9489 2.0344h5.0536l2.962-2.0344 1.442-1.1921z" fill="#c0ac9d" stroke="#c0ac9d" /><path d="m20.2659 26.7082-.6236-.4406h-3.6635l-.6236.4406-.3508 2.9025.3248-.2851h4.9626l.3378.2851z" fill="#161616" stroke="#161616" /><path d="m33.5168 11.3532 1.1043-5.36447-1.6629-4.98873-12.6923 9.3944 4.8846 4.1205 6.8983 2.0085 1.52-1.7752-.6626-.4795 1.0523-.9588-.8054-.622 1.0523-.8034z" fill="#763e1a" stroke="#763e1a" /><path d="m1 5.98873 1.11724 5.36447-.71451.5313 1.06527.8034-.80545.622 1.05228.9588-.66255.4795 1.51997 1.7752 6.89835-2.0085 4.8846-4.1205-12.69233-9.3944z" fill="#763e1a" stroke="#763e1a" /><path d="m32.0489 16.5234-6.8983-2.0085 2.0786 3.1358-3.1049 6.0513 4.1052-.0519h6.1318z" fill="#f5841f" stroke="#f5841f" /><path d="m10.4705 14.5149-6.89828 2.0085-2.29944 7.1267h6.11883l4.10519.0519-3.10487-6.0513z" fill="#f5841f" stroke="#f5841f" /><path d="m19.8241 17.9876.4417-7.5932 2.0007-5.4034h-8.9119l2.0006 5.4034.4417 7.5932.1689 2.3842.013 5.8958h3.6635l.013-5.8958z" fill="#f5841f" stroke="#f5841f" /></g></svg>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row"><img src={bshares} className="table_img"/>$BSHARE</th>
                                            <td>{roundAndFormatNumber(bShareCirculatingSupply, 2)}</td>
                                            <td>{roundAndFormatNumber(bShareTotalSupply, 2)}</td>
                                            <td>${bSharePriceInDollars ? bSharePriceInDollars : '-.--'}
                                                <div className="table-el">{bSharePriceInBNB ? bSharePriceInBNB : '-.----'}  BTCB</div>
                                            </td>
                                            <td>
                                                <svg fill="none" height="33" viewBox="0 0 35 33" width="35" xmlns="http://www.w3.org/2000/svg"><g stroke-linecap="round" stroke-linejoin="round" stroke-width=".25"><path d="m32.9582 1-13.1341 9.7183 2.4424-5.72731z" fill="#e17726" stroke="#e17726" /><g fill="#e27625" stroke="#e27625"><path d="m2.66296 1 13.01714 9.809-2.3254-5.81802z" /><path d="m28.2295 23.5335-3.4947 5.3386 7.4829 2.0603 2.1436-7.2823z" /><path d="m1.27281 23.6501 2.13055 7.2823 7.46994-2.0603-3.48166-5.3386z" /><path d="m10.4706 14.5149-2.0786 3.1358 7.405.3369-.2469-7.969z" /><path d="m25.1505 14.5149-5.1575-4.58704-.1688 8.05974 7.4049-.3369z" /><path d="m10.8733 28.8721 4.4819-2.1639-3.8583-3.0062z" /><path d="m20.2659 26.7082 4.4689 2.1639-.6105-5.1701z" /></g><path d="m24.7348 28.8721-4.469-2.1639.3638 2.9025-.039 1.231z" fill="#d5bfb2" stroke="#d5bfb2" /><path d="m10.8732 28.8721 4.1572 1.9696-.026-1.231.3508-2.9025z" fill="#d5bfb2" stroke="#d5bfb2" /><path d="m15.1084 21.7842-3.7155-1.0884 2.6243-1.2051z" fill="#233447" stroke="#233447" /><path d="m20.5126 21.7842 1.0913-2.2935 2.6372 1.2051z" fill="#233447" stroke="#233447" /><path d="m10.8733 28.8721.6495-5.3386-4.13117.1167z" fill="#cc6228" stroke="#cc6228" /><path d="m24.0982 23.5335.6366 5.3386 3.4946-5.2219z" fill="#cc6228" stroke="#cc6228" /><path d="m27.2291 17.6507-7.405.3369.6885 3.7966 1.0913-2.2935 2.6372 1.2051z" fill="#cc6228" stroke="#cc6228" /><path d="m11.3929 20.6958 2.6242-1.2051 1.0913 2.2935.6885-3.7966-7.40495-.3369z" fill="#cc6228" stroke="#cc6228" /><path d="m8.392 17.6507 3.1049 6.0513-.1039-3.0062z" fill="#e27525" stroke="#e27525" /><path d="m24.2412 20.6958-.1169 3.0062 3.1049-6.0513z" fill="#e27525" stroke="#e27525" /><path d="m15.797 17.9876-.6886 3.7967.8704 4.4833.1949-5.9087z" fill="#e27525" stroke="#e27525" /><path d="m19.8242 17.9876-.3638 2.3584.1819 5.9216.8704-4.4833z" fill="#e27525" stroke="#e27525" /><path d="m20.5127 21.7842-.8704 4.4834.6236.4406 3.8584-3.0062.1169-3.0062z" fill="#f5841f" stroke="#f5841f" /><path d="m11.3929 20.6958.104 3.0062 3.8583 3.0062.6236-.4406-.8704-4.4834z" fill="#f5841f" stroke="#f5841f" /><path d="m20.5906 30.8417.039-1.231-.3378-.2851h-4.9626l-.3248.2851.026 1.231-4.1572-1.9696 1.4551 1.1921 2.9489 2.0344h5.0536l2.962-2.0344 1.442-1.1921z" fill="#c0ac9d" stroke="#c0ac9d" /><path d="m20.2659 26.7082-.6236-.4406h-3.6635l-.6236.4406-.3508 2.9025.3248-.2851h4.9626l.3378.2851z" fill="#161616" stroke="#161616" /><path d="m33.5168 11.3532 1.1043-5.36447-1.6629-4.98873-12.6923 9.3944 4.8846 4.1205 6.8983 2.0085 1.52-1.7752-.6626-.4795 1.0523-.9588-.8054-.622 1.0523-.8034z" fill="#763e1a" stroke="#763e1a" /><path d="m1 5.98873 1.11724 5.36447-.71451.5313 1.06527.8034-.80545.622 1.05228.9588-.66255.4795 1.51997 1.7752 6.89835-2.0085 4.8846-4.1205-12.69233-9.3944z" fill="#763e1a" stroke="#763e1a" /><path d="m32.0489 16.5234-6.8983-2.0085 2.0786 3.1358-3.1049 6.0513 4.1052-.0519h6.1318z" fill="#f5841f" stroke="#f5841f" /><path d="m10.4705 14.5149-6.89828 2.0085-2.29944 7.1267h6.11883l4.10519.0519-3.10487-6.0513z" fill="#f5841f" stroke="#f5841f" /><path d="m19.8241 17.9876.4417-7.5932 2.0007-5.4034h-8.9119l2.0006 5.4034.4417 7.5932.1689 2.3842.013 5.8958h3.6635l.013-5.8958z" fill="#f5841f" stroke="#f5841f" /></g></svg>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th scope="row"><img src={bbond} className="table_img"/>$BBOND</th>
                                            <td>{roundAndFormatNumber(tBondCirculatingSupply, 2)}</td>
                                            <td>{roundAndFormatNumber(tBondTotalSupply, 2)}</td>
                                            <td>${tBondPriceInDollars ? tBondPriceInDollars : '-.--'}
                                                <div className="table-el">{tBondPriceInBNB ? tBondPriceInBNB : '-.----'} BTCB</div>
                                            </td>
                                            <td>
                                                <svg fill="none" height="33" viewBox="0 0 35 33" width="35" xmlns="http://www.w3.org/2000/svg"><g stroke-linecap="round" stroke-linejoin="round" stroke-width=".25"><path d="m32.9582 1-13.1341 9.7183 2.4424-5.72731z" fill="#e17726" stroke="#e17726" /><g fill="#e27625" stroke="#e27625"><path d="m2.66296 1 13.01714 9.809-2.3254-5.81802z" /><path d="m28.2295 23.5335-3.4947 5.3386 7.4829 2.0603 2.1436-7.2823z" /><path d="m1.27281 23.6501 2.13055 7.2823 7.46994-2.0603-3.48166-5.3386z" /><path d="m10.4706 14.5149-2.0786 3.1358 7.405.3369-.2469-7.969z" /><path d="m25.1505 14.5149-5.1575-4.58704-.1688 8.05974 7.4049-.3369z" /><path d="m10.8733 28.8721 4.4819-2.1639-3.8583-3.0062z" /><path d="m20.2659 26.7082 4.4689 2.1639-.6105-5.1701z" /></g><path d="m24.7348 28.8721-4.469-2.1639.3638 2.9025-.039 1.231z" fill="#d5bfb2" stroke="#d5bfb2" /><path d="m10.8732 28.8721 4.1572 1.9696-.026-1.231.3508-2.9025z" fill="#d5bfb2" stroke="#d5bfb2" /><path d="m15.1084 21.7842-3.7155-1.0884 2.6243-1.2051z" fill="#233447" stroke="#233447" /><path d="m20.5126 21.7842 1.0913-2.2935 2.6372 1.2051z" fill="#233447" stroke="#233447" /><path d="m10.8733 28.8721.6495-5.3386-4.13117.1167z" fill="#cc6228" stroke="#cc6228" /><path d="m24.0982 23.5335.6366 5.3386 3.4946-5.2219z" fill="#cc6228" stroke="#cc6228" /><path d="m27.2291 17.6507-7.405.3369.6885 3.7966 1.0913-2.2935 2.6372 1.2051z" fill="#cc6228" stroke="#cc6228" /><path d="m11.3929 20.6958 2.6242-1.2051 1.0913 2.2935.6885-3.7966-7.40495-.3369z" fill="#cc6228" stroke="#cc6228" /><path d="m8.392 17.6507 3.1049 6.0513-.1039-3.0062z" fill="#e27525" stroke="#e27525" /><path d="m24.2412 20.6958-.1169 3.0062 3.1049-6.0513z" fill="#e27525" stroke="#e27525" /><path d="m15.797 17.9876-.6886 3.7967.8704 4.4833.1949-5.9087z" fill="#e27525" stroke="#e27525" /><path d="m19.8242 17.9876-.3638 2.3584.1819 5.9216.8704-4.4833z" fill="#e27525" stroke="#e27525" /><path d="m20.5127 21.7842-.8704 4.4834.6236.4406 3.8584-3.0062.1169-3.0062z" fill="#f5841f" stroke="#f5841f" /><path d="m11.3929 20.6958.104 3.0062 3.8583 3.0062.6236-.4406-.8704-4.4834z" fill="#f5841f" stroke="#f5841f" /><path d="m20.5906 30.8417.039-1.231-.3378-.2851h-4.9626l-.3248.2851.026 1.231-4.1572-1.9696 1.4551 1.1921 2.9489 2.0344h5.0536l2.962-2.0344 1.442-1.1921z" fill="#c0ac9d" stroke="#c0ac9d" /><path d="m20.2659 26.7082-.6236-.4406h-3.6635l-.6236.4406-.3508 2.9025.3248-.2851h4.9626l.3378.2851z" fill="#161616" stroke="#161616" /><path d="m33.5168 11.3532 1.1043-5.36447-1.6629-4.98873-12.6923 9.3944 4.8846 4.1205 6.8983 2.0085 1.52-1.7752-.6626-.4795 1.0523-.9588-.8054-.622 1.0523-.8034z" fill="#763e1a" stroke="#763e1a" /><path d="m1 5.98873 1.11724 5.36447-.71451.5313 1.06527.8034-.80545.622 1.05228.9588-.66255.4795 1.51997 1.7752 6.89835-2.0085 4.8846-4.1205-12.69233-9.3944z" fill="#763e1a" stroke="#763e1a" /><path d="m32.0489 16.5234-6.8983-2.0085 2.0786 3.1358-3.1049 6.0513 4.1052-.0519h6.1318z" fill="#f5841f" stroke="#f5841f" /><path d="m10.4705 14.5149-6.89828 2.0085-2.29944 7.1267h6.11883l4.10519.0519-3.10487-6.0513z" fill="#f5841f" stroke="#f5841f" /><path d="m19.8241 17.9876.4417-7.5932 2.0007-5.4034h-8.9119l2.0006 5.4034.4417 7.5932.1689 2.3842.013 5.8958h3.6635l.013-5.8958z" fill="#f5841f" stroke="#f5841f" /></g></svg>
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
                                                <td>{Math.round(boardroomAPR.toFixed(2) / 365)}%</td>
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
                    <div className="bbond-img">
                        <img src = {bbond} className="s4-bbond-img"/>
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
                                    <img src = {bbond} className="s4-bbond-img"/>
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

    );
}

export default Dashboard