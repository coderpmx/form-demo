import {
  MenuItem,
  Button,
  TextField,
  Stack,
  Paper,
  Container,
  Box,
} from "@mui/material";
const currencies = [{ value: "单选", label: "单选" }];
function Form() {
  return (
    <Container maxWidth="sm">
      <Paper>
        <Box
          sx={{
            p: 4,
          }}
        >
          <Stack direction="row" justifyContent="space-between" spacing={1}>
            <TextField label="标题" helperText="Title is required"></TextField>
            <TextField
              select
              label="类型"
              defaultValue="单选"
              sx={{ flex: "1" }}
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          <Stack sx={{ height: 400 }} justifyContent="space-evenly">
            <TextField label="副标题" helperText="subTitle is required"></TextField>
            <TextField label="描述" multiline rows={4}></TextField>
            <TextField label="价格" type="number" helperText="Price must be at least 1"></TextField>
            <Button variant="contained">提交</Button>
            <Button variant="contained" disabled>
              编辑
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}

export default Form;
