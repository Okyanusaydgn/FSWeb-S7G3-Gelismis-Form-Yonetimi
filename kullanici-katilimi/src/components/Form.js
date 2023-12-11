import { useEffect, useState} from "react";
import * as Yup from "yup";
import axios from "axios";

const Form = ({yeniKullaniciEkle}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    terms: false,
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
    terms: "",
  });

  const [formValid, setFormValid] = useState(false);

  const formSchema = Yup.object().shape({
    name: Yup.string()
        .required("Must be a name section"),
    email: Yup.string()
        .email("Must be a valid email address.")
        .required("Must include email address."),
    password: Yup.string()
        .required("Password is required")
        .min(6, "Password nust be at least 6 characters long."),
    terms: Yup.boolean().oneOf([true], "You must accept Terms and Conditions"),
    // required isn't required for checkboxs.
  });

  const inputChangeHandler = (e) => {
    const { name, type, checked, value } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    // setFormData({...formData, [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value,});


    Yup.reach(formSchema, name)
        .validate(type === "checkbox" ? checked : value)
        .then((valid) => {
            setFormErrors({...formErrors, [name]:""});
        })
        .catch((err) => {
            setFormErrors({...formErrors, [name]:err.errors[0]});
        });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (formValid){
        //dataları server'a gönder
        axios.post("https://reqres.in/api/users", formData)
            .then(res => {
                console.log("serverdan cevap geldi: ", res)
                // yeni kullanıcıyı app componentine gönder
                yeniKullaniciEkle(res.data);
            })
            .catch(err => {
                console.log("serverdan hata geldi: ", err)
            })
    } else {
       // kullanıcıyı bilgilendir.
       console.warn("Form datası valid değil!")
    }


    console.log("formData >", formData);
  };

  useEffect(() => {
    // console.log("formData güncellendi", formData);
    formSchema.isValid(formData).then((valid) => setFormValid(valid));
  }, [formData]);

  useEffect(() => {
    // console.log("formData güncellendi", formData);
    console.error("formErrors: ", formErrors);
  }, [formErrors]);

  return (
    <form onSubmit={submitHandler}>
      <h2>Form</h2>
      {/* Buraya form nesneleri gelecek */}
      <div>
        <label>
          İsim Soyisim:
          <input type="text" name="name" onChange={inputChangeHandler} />
        </label>
        {formErrors.name && <div className="input-error">{formErrors.name}</div>}
      </div>
      <div>
        <label>
          E-posta:
          <input type="email" name="email" onChange={inputChangeHandler} />
        </label>
        {formErrors.email && <div className="input-error">{formErrors.email}</div>}
      </div>
      <div>
        <label>
          Şifre:
          <input
            type="password"
            name="password"
            onChange={inputChangeHandler}
          />
        </label>
        {formErrors.password && <div className="input-error">{formErrors.password}</div>}
      </div>
      <div>
        <label>
          Kullanım Şartları:
          <input type="checkbox" name="terms" onChange={inputChangeHandler} />
        </label>
        {formErrors.terms && <div className="input-error">{formErrors.terms}</div>}
      </div>
      <div>
        <button type="submit" disabled={!formValid}> Gönder </button>
      </div>
    </form>
  );
};

export default Form;
