import React from 'react'
import { AppBar, CssBaseline, Toolbar, Typography, Container, Card, Grid, Button, CardMedia, CardContent } from '@material-ui/core'
import StoreIcon from '@material-ui/icons/Store'
import useStyles from './styles'

const App = () => {
    const classes = useStyles();

    return (
        <div className='app'>
            <CssBaseline />
                <AppBar position="relative">
                    <Toolbar>
                        <StoreIcon className={classes.icon} />
                        <Typography variant="h6">
                            Stand with Dorayaki
                        </Typography>
                    </Toolbar>
                </AppBar>
                <main>
                    <div className={classes.container}>
                        <Container maxWidth="sm">
                            <Typography variant="h3" align="center" color="textPrimary" gutterBottom>
                                Stand with Dorayaki
                            </Typography>
                            <Typography variant="h6" align="center" color="textSecondary" paragraph>
                                Web application for Dorayaki stock management system
                            </Typography>
                            <div>
                                <Grid container spacing={2} justify="center">
                                    <Grid item>
                                        <Button variant="contained" color="primary">
                                            Add Dorayaki Store
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="contained" color="secondary">
                                            Add Dorayaki Variant
                                        </Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </Container>
                    </div>
                    <Container className={classes.cardGrid} maxWidth='md'>
                        <Grid container spacing={4}>
                            <Grid item>
                                <Card className={classes.card}>
                                    <CardMedia 
                                        className={classes.cardMedia}
                                        image="https://source.unsplash.com/random"
                                        title="Image title"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography variant='h5' gutterBottom>
                                            tes tes tes
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Container>
                </main>
        </div>
    )
}

export default App
