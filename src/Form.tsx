import {
  MenuItem,
  Button,
  TextField,
  Stack,
  Paper,
  Container,
  Box,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { useFormik } from "formik";
import * as yup from "yup";

const currencies = [
  { value: "single", label: "单选" },
  { value: "package", label: "包装" },
];

interface Values {
  title: string;
  type: string;
  subTitle: string;
  description: string;
  price: string;
}

const initialValues: Values = {
  title: "",
  type: "single",
  subTitle: "",
  description: "",
  price: "",
};

const validationSchema = yup.object({
  title: yup
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters")
    .required("Title is required"),
  type: yup.mixed().oneOf(["single", "package"]).required("Type is required"),
  subTitle: yup
    .string()
    .min(3, "SubTitle must be at least 3 characters")
    .max(100, "SubTitle must be less than 100 characters")
    .required("SubTitle is required"),
  description: yup
    .string()
    .min(3, "Description must be at least 3 characters")
    .max(1000, "Description must be less than 1000 characters"),
  price: yup.number().required("Price is required"),
});

function Form() {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values: Values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Container maxWidth="sm">
      <Paper>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{
            p: 4,
            "& .MuiFormHelperText-root": {
              color: red[500],
            },
          }}
        >
          <Stack direction="row" justifyContent="space-between" spacing={1}>
            <TextField
              label="标题"
              name="title"
              value={formik.values.title}
              helperText={formik.errors.title}
              onChange={formik.handleChange}
            ></TextField>
            <TextField
              select
              label="类型"
              // id="type"
              name="type"
              value={formik.values.type}
              defaultValue="single"
              sx={{ flex: "1" }}
              onChange={formik.handleChange}
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          <Stack sx={{ height: 400 }} justifyContent="space-evenly">
            <TextField
              label="副标题"
              name="subTitle"
              value={formik.values.subTitle}
              helperText={formik.errors.subTitle}
              onChange={formik.handleChange}
            ></TextField>
            <TextField
              label="描述"
              name="description"
              multiline
              rows={4}
              value={formik.values.description}
              helperText={formik.errors.description}
              onChange={formik.handleChange}
            ></TextField>
            <TextField
              label="价格"
              name="price"
              type="number"
              value={formik.values.price}
              helperText={formik.errors.price}
              onChange={formik.handleChange}
            ></TextField>
            <Button variant="contained" type="submit">
              提交
            </Button>
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
