import * as yup from "yup"

const validations = yup.object().shape({
    email: yup
    .string()
    .email("Gecerli bir email girin.")
    .required("Zorunlu alan"),
 password: yup
    .string()
    .min(5, "en az 5 karakter")
    .required(),  
})

export default validations