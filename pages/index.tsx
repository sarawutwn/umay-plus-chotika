import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import theme from "../utils/theme";
import { ThemeProvider } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import WarningIcon from "@mui/icons-material/Warning";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { jangwat } from "../utils/jangwat";
import { workType } from "../utils/work-type";
import { timeType } from "../utils/ timeType";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import axios from "axios";
import qs from "querystring";
import moment from "moment";

function groupBy(list: any[], keyGetter: (arg0: any) => any) {
  const map = new Map();
  list.forEach((item: any) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}

export default function Home() {
  const [message, setMessage] = useState({
    gender: "",
    firstname: "",
    lastname: "",
    code: "",
    phone: "",
    selectJangWat: "",
    selectPisanee: "",
    workType: "",
    workName: "",
    timeType: "",
    birthOfDate: `${new Date()}`,
  });
  const [jangwatState, setJangWatState] = useState([]);
  const [pisanee, setPisanee] = useState([]);
  const [verify, setVerify] = useState(false);

  const mount = async () => {
    const data: any = await groupBy(jangwat, (item) => item.province);
    const state:any = [];
    for (let item of data) {
      await state.push(item[0]);
    }
    setJangWatState(state);
  };

  const submit = async () => {
    if(message.firstname === "" || message.lastname === "" || message.code === "" || message.code.length !== 13 || message.phone === "" || message.selectJangWat === "" || message.selectPisanee === "" || message.workType === "" || message.workName === "" || message.timeType === "") {
      alert("???????????????????????????????????????????????????????????????!");
      return;
    }
    try {
      let date = new Date(message.birthOfDate)
      const lineMessage = `
      \n????????????-${message.firstname} ${message.lastname}\n?????????????????????-${message.code}\n?????????????????????-${date.toLocaleDateString('th')}\n?????????????????????-${message.selectJangWat} ${message.selectPisanee}\n???????????????????????????????????????-${message.phone}\n???????????????-${message.workType}\n??????????????????????????????-${message.workName}\n???????????????????????????????????????????????????????????????-${message.timeType}`;
      axios({
        method: 'post',
        url: '/api/line-notify',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Access-Control-Allow-Origin': '*'
        },
        data: qs.stringify({
          message: lineMessage,
        })
      }).then((res) => {
        if(res.data.status === "success") {
          alert("??????????????????????????????????????? ????????????????????????????????????????????????????????????");
          setMessage({
            gender: "",
            firstname: "",
            lastname: "",
            code: "",
            phone: "",
            selectJangWat: "",
            selectPisanee: "",
            workType: "",
            workName: "",
            timeType: "",
            birthOfDate: `${new Date()}`,
          })
        }
      }).catch(err => {
        alert(err)
      })
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    mount();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div style={{ backgroundColor: "#0b5ea0" }}>
        <Head>
          <title>UMAY | Sale ??????????????????</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <main className={styles.main}>
          <Box
            sx={{
              mt: 1,
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#FFFF",
              color: "#0b5ea0",
              maxWidth: {
                sm: "550px",
                xs: "350px",
              },
              width: "100%",
              borderRadius: "3px",
            }}
          >
            <Stack
              sx={{ justifyContent: "center", alignItems: "center", mt: 2 }}
            >
              <Image
                src="/logo.png"
                alt="me"
                width="140"
                height="140"
                style={{ borderRadius: "100px" }}
              />
            </Stack>
            <Stack
              sx={{ justifyContent: "center", alignItems: "center", mt: 2 }}
            >
              <Typography variant="h4" sx={{ textAlign: "center"}}>
                <b>UMAY+</b>
                {` `}
                <b>????????????????????????????????????</b>
              </Typography>
              <Typography variant="h5"></Typography>
              <Typography variant="subtitle2">??????????????????????????????????????????</Typography>
            </Stack>

            <Stack
              sx={{ justifyContent: "center", alignItems: "center", mt: 4 }}
            >
              <FormControl
                onChange={(event) => {
                  const target = event.target as HTMLInputElement;
                  setMessage({ ...message, gender: target.value })
                }
                }
              >
                <FormLabel
                  id="demo-radio-buttons-group-label"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  ????????????????????????
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                  sx={{ display: "flex", flexDirection: "row" }}
                >
                  <FormControlLabel
                    value="?????????"
                    control={<Radio />}
                    label="?????????"
                  />
                  <FormControlLabel
                    value="?????????"
                    control={<Radio />}
                    label="?????????"
                  />
                  <FormControlLabel
                    value="??????????????????"
                    control={<Radio />}
                    label="??????????????????"
                  />
                </RadioGroup>
              </FormControl>
            </Stack>
            <Grid container sx={{ mt: 1 }}>
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  mx: { xs: 1, md: 0 },
                  mt: { xs: 1, md: 0 },
                }}
              >
                <TextField
                  value={message.firstname}
                  fullWidth
                  variant="outlined"
                  size="small"
                  label="????????????"
                  sx={{ pr: { md: 0.5, xs: 0 }, pl: { md: 1, xs: 0 } }}
                  onChange={(e) =>
                    setMessage({ ...message, firstname: `${e.target.value}` })
                  }
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  mx: { xs: 1, md: 0 },
                  mt: { xs: 1, md: 0 },
                }}
              >
                <TextField
                  value={message.lastname}
                  fullWidth
                  variant="outlined"
                  size="small"
                  label="?????????????????????"
                  sx={{ pr: { md: 1, xs: 0 }, pl: { md: 0.5, xs: 0 } }}
                  onChange={(e) =>
                    setMessage({ ...message, lastname: `${e.target.value}` })
                  }
                />
              </Grid>
            </Grid>
            <Stack
              sx={{ display: "flex", justifyContent: "start", ml: 1, mt: 1 }}
            >
              <TextField
                value={message.code}
                fullWidth
                variant="outlined"
                size="small"
                label="??????????????????????????????????????????"
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                sx={{ pr: { md: 1, xs: 1 }, pl: { md: 0, xs: 0 } }}
                onChange={(e) => {
                  if (e.target.value.length <= 13) {
                    setMessage({ ...message, code: e.target.value });
                  } else {
                    e.preventDefault();
                  }
                }}
              />
            </Stack>
            <Stack
              sx={{
                justifyContent: "center",
                alignItems: "center",
                mt: 1,
                mr: 0.5,
                ml: 1.5,
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                  label="?????????????????????"
                  inputFormat="DD MMMM YYYY"
                  renderInput={(params) => (
                    <TextField
                      size="small"
                      sx={{ mr: 1 }}
                      fullWidth
                      {...params}
                      helperText={null}
                    />
                  )}
                  onChange={(newValue) => {
                    let date:string = newValue as string;
                    setMessage({ ...message, birthOfDate: date })
                  }}
                  value={message.birthOfDate}
                />
              </LocalizationProvider>
            </Stack>
            <Grid container sx={{ mt: 1 }}>
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  mx: { xs: 1, md: 0 },
                  mt: { xs: 1, md: 0 },
                }}
              >
                <TextField
                  value={message?.selectJangWat}
                  fullWidth
                  variant="outlined"
                  size="small"
                  label="????????????????????????????????????????????????????????????"
                  select
                  sx={{ pr: { md: 1, xs: 0 }, pl: { md: 1, xs: 0 } }}
                  onChange={(e) => {
                    setPisanee([]);
                    setMessage({
                      ...message,
                      selectJangWat: `${e.target.value}`,
                    });
                  }}
                >
                  {jangwatState.map((item) => {
                    return (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  mx: { xs: 1, md: 0 },
                  mt: { xs: 1, md: 0 },
                }}
              >
                <TextField
                  value={message.selectPisanee}
                  fullWidth
                  variant="outlined"
                  size="small"
                  label="????????????????????????????????????????????????????????????????????????"
                  sx={{ pr: { md: 1, xs: 0 }, pl: { md: 0, xs: 0 } }}
                  disabled={message.selectJangWat === ""}
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  onChange={(e) => {
                    if (e.target.value.length <= 5) {
                      setMessage({ ...message, selectPisanee: e.target.value });
                    } else {
                      e.preventDefault();
                    }
                  }}
                ></TextField>
              </Grid>
            </Grid>
            <Stack
              sx={{ display: "flex", justifyContent: "start", ml: 1, mt: 1 }}
            >
              <TextField
                value={message.phone}
                fullWidth
                variant="outlined"
                size="small"
                label="?????????????????????????????????????????????????????????"
                sx={{ pr: { md: 1, xs: 1 }, pl: { md: 0, xs: 0 } }}
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                onChange={(e) => {
                  if (e.target.value.length <= 10) {
                    setMessage({ ...message, phone: e.target.value });
                  } else {
                    e.preventDefault();
                  }
                }}
              ></TextField>
            </Stack>
            <Stack
              sx={{ display: "flex", justifyContent: "start", ml: 1, mt: 1 }}
            >
              <TextField
                value={message.workType}
                fullWidth
                variant="outlined"
                size="small"
                label="??????????????????????????????"
                sx={{ pr: { md: 1, xs: 1 }, pl: { md: 0, xs: 0 } }}
                onChange={(e) =>
                  setMessage({ ...message, workType: e.target.value })
                }
                select
              >
                {workType.map((item) => {
                  return (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Stack>
            <Stack
              sx={{ display: "flex", justifyContent: "start", ml: 1, mt: 1 }}
            >
              <TextField
                value={message.workName}
                fullWidth
                variant="outlined"
                size="small"
                label="??????????????????????????????"
                sx={{ pr: { md: 1, xs: 1 }, pl: { md: 0, xs: 0 } }}
                onChange={(e) =>
                  setMessage({ ...message, workName: e.target.value })
                }
              />
            </Stack>
            <Stack
              sx={{ display: "flex", justifyContent: "start", ml: 1, mt: 1 }}
            >
              <TextField
                value={message.timeType}
                fullWidth
                variant="outlined"
                size="small"
                label="????????????????????????????????????????????????????????????????????????????????????????????????"
                sx={{ pr: { md: 1, xs: 1 }, pl: { md: 0, xs: 0 } }}
                onChange={(e) =>
                  setMessage({ ...message, timeType: e.target.value })
                }
                select
              >
                {timeType.map((item) => {
                  return (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Stack>
            <Stack
              sx={{ display: "flex", justifyContent: "start", ml: 1, mt: 3 }}
            >
              <Typography
                variant="subtitle2"
                sx={{ color: "black" }}
              >{`     ???????????????????????????????????????????????????????????????????????????????????????????????? ???????????????????????????????????????????????????????????? ?????????????????????????????????????????????????????????????????????????????????????????????????????? ??????????????????????????????????????????????????????????????????????????????????????????????????????????????? ?????????????????????????????????????????? LineID : 0641932423`}</Typography>
              <a
                href="https://www.easybuy.co.th/th/pdpacustomer"
                style={{ display: "flex", flexDirection: "row", marginTop: "10px" }}
              >
                <WarningIcon fontSize="small" />
                <Typography variant="subtitle2">
                  ???????????????????????????????????????????????????????????????????????????????????????
                </Typography>
              </a>
            </Stack>
            <Stack
              sx={{ display: "flex", flexDirection: "row", justifyContent: "start", ml: 0, mt:1 }}
            >
              <Checkbox checked={verify} onChange={(e) => setVerify(e.target.checked)} />
              <Typography variant="subtitle2" sx={{ mt: 1.3 }}>????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????</Typography>
            </Stack>
            <Stack
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 4,
                mx: 1,
                mb: 1,
              }}
            >
              <Button
                disabled={!verify || message.firstname === "" || message.lastname === "" || message.code === "" || message.code.length !== 13 || message.phone === "" || message.selectJangWat === "" || message.selectPisanee === "" || message.workType === "" || message.workName === "" || message.timeType === ""}
                variant="contained"
                size="small"
                color="success"
                sx={{ boxShadow: 0, borderRadius: "3px" }}
                onClick={(e) => {
                  e.preventDefault();
                  submit();
                }}
              >
                ?????????
              </Button>
            </Stack>
          </Box>
        </main>

        <footer className={styles.footer}>
          <a
            href="https://github.com/sarawutwn"
            rel="noopener noreferrer"
          >
            Develop by{" github.com/sarawutwn"}
          </a>
        </footer>
      </div>
    </ThemeProvider>
  );
}
