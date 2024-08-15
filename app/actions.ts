"use server";

export async function handleForm(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (formData.get("password") === "12345") {
    return {
      sucess: true
    };
  } else {
    return {
      errors: ["wrong password"],
    };
  }
}