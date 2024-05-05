import Box from '@mui/material/Box';

import BreadcrumbsComponent from '../../components/BreadcrubsComponent/BreadcrumbsComponent';
import { bgGray, primary } from "../../const/constCSS";
import { CardMedia, Grid,Typography } from '@mui/material';

import FormRevenue from '../../components/FormRevenue/FormRevenue';
import FormSpending from '../../components/FormSpending/FormSpending';


function Transactions() {

    const dataUserLocal = JSON.parse(localStorage.getItem('dataUser'));
    console.log(dataUserLocal);

    const revenues = [
        { id: '1', title: "Sức khỏe", url: 'img/icon_1.png' },
        { id: '2', title: "Ăn uống", url: 'img/icon_2.png' },
        { id: '3', title: "Siêu thị", url: 'img/icon_3.png' },
        { id: '4', title: "Học tập", url: 'img/icon_4.png' },
        { id: '5', title: "Máy bay", url: 'img/icon_5.png' },
        { id: '6', title: "Xem phim", url: 'img/icon_6.png' },
        { id: '7', title: "Đi chợ", url: 'img/icon_7.png' },
    ];

    const spendings = [
        { id: '1', title: "Lương về", url: 'img/icon_8.png' },
        { id: '2', title: "Khoản thu khác", url: 'img/icon_9.png' },
    ]

    return (
        <>
            <Box
                sx={{
                    backgroundColor: `${bgGray}`,
                }}
            >
                <BreadcrumbsComponent />
                <Grid
                    container
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-evenly'
                    }}
                >
                    <Grid
                        item xs={5}
                        sx={{
                            height: '100%',
                            marginTop: '102px',
                            backgroundColor: 'white'
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '22px',
                                color: `${primary}`,
                                margin: '20px 40px'
                            }}
                        >
                            Add revenue
                        </Typography>
                        <Box>
                            {revenues.map((revenue, ind) => (
                                <Box
                                    key={ind}
                                    sx={{
                                        display: 'flex',
                                        padding: '10px'
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: '180px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: '18px',
                                                marginLeft: '10px'
                                            }}
                                        >
                                            {revenue.title}
                                        </Typography>
                                        <CardMedia
                                            component='img'
                                            image={revenue.url}
                                            sx={{
                                                width: '40px',
                                            }}
                                        />
                                    </Box>
                                    <FormRevenue />
                                </Box>
                            ))}
                        </Box>
                    </Grid>
                    <Grid
                        item xs={5}
                        sx={{
                            height: '100%',
                            marginTop: '102px',
                            backgroundColor: 'white'
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '22px',
                                color: `${primary}`,
                                margin: '20px 40px'
                            }}
                        >
                            Add spending
                        </Typography>
                        <Box>
                            {spendings.map(spending => (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        padding: '10px'
                                    }}
                                >
                                    <Box
                                        sx={{
                                            width: '180px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: '18px',
                                                marginLeft: '10px'
                                            }}
                                        >
                                            {spending.title}
                                        </Typography>
                                        <CardMedia
                                            component='img'
                                            image={spending.url}
                                            sx={{
                                                width: '40px',
                                            }}
                                        />
                                    </Box>
                                    <FormSpending />
                                </Box>
                            ))}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default Transactions;