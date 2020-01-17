import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));
  
  export default function FullWidthGrid() {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
         
          <Grid item xs={12} sm={9}>
            <Paper className={classes.paper}></Paper>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Paper className={classes.paper}><div class="col">
                <div className="form-group">
                    <label>Sort by </label>
                    <select class="form-control" onChange={(event)=>this.nursesortage(event)}>
                        <option>Select by Age</option>
                        <option value={1}>Age: Low To High</option>
                        <option value={2}>Age: High - Low</option>
                    </select>
                </div>
            </div>
            
            <div class="col">
                <div className="form-group">
                    <label>Sort by </label>
                    <select class="form-control" onChange={(event)=>this.nursesortage(event)}>
                        <option>Select by Age</option>
                        <option value={1}>Age: Low To High</option>
                        <option value={2}>Age: High - Low</option>
                    </select>
                </div>
            </div></Paper>
          </Grid>
  
        </Grid>
      </div>
    
  
  );
}