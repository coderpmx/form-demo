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

// 表单初始化数据
const initialValues: Values = {
  title: "",
  type: "single",
  subTitle: "",
  description: "",
  price: "",
};

// 验证规则
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
  price: yup
    .number()
    .min(1, "Price must be at least 1")
    .required("Price is required"),
});

interface WrapProps {
  formik: any;
  name: string;
  [otherProps: string]: any;
}
// 封装基础基础表单逻辑
const WrapTextField: React.FC<React.PropsWithChildren<WrapProps>> = ({
  formik,
  name,
  children,
  ...props
}) => {
  return (
    <TextField
      value={formik.values[name]}
      helperText={formik.errors[name]}
      onChange={formik.handleChange}
      name={name}
      {...props}
    >
      {children}
    </TextField>
  );
};

function Form() {
  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,

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
              fontStyle: "italic",
            },
          }}
        >
          <Stack direction="row" justifyContent="space-between" spacing={1}>
            <WrapTextField
              label="标题"
              name="title"
              formik={formik}
            ></WrapTextField>
            <WrapTextField
              select
              label="类型"
              name="type"
              sx={{ flex: "1" }}
              formik={formik}
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </WrapTextField>
          </Stack>
          <Stack sx={{ height: 400 }} justifyContent="space-evenly">
            <WrapTextField
              label="副标题"
              name="subTitle"
              formik={formik}
            ></WrapTextField>
            <WrapTextField
              label="描述"
              name="description"
              multiline
              rows={4}
              formik={formik}
            ></WrapTextField>
            <WrapTextField
              label="价格"
              name="price"
              type="number"
              formik={formik}
            ></WrapTextField>
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
