
import React, { useState } from "react";
import logo from "./images/card-logo.svg";

function App() {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [date, setDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [cardNumberError, setCardNumberError] = useState("");
  const [cvcError, setCvcError] = useState("");

  const validateCard = () => {
    // Validation logic here
    const isCardNumberValid = cardNumber.replace(/\s/g, "").length === 16; // Adjust this length as needed
    const isNameValid = !!name.trim();
    const isDateValid = /^[0-9]{2}\/[0-9]{2}$/.test(date);
    const isCvcValid = /^\d+$/.test(cvc) && cvc.length === 3;

    setIsValid(isCardNumberValid && isNameValid && isDateValid && isCvcValid);

    // Set card number error message
    if (!isCardNumberValid) {
      setCardNumberError("Must be 16 digits");
    } else {
      setCardNumberError("");
    }

    // Set cvc error message
    if (!isCvcValid) {
      setCvcError("CVC must be 3-digit");
    } else {
      setCvcError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateCard();
    if (isValid) {
      setIsCardVisible(true);
      setShowSuccessMessage(true);
    }
  };

  return (
    <>
      <section className="full">
        <div className="total_card">
          <div className="font-card">
            <img src={logo} alt="" />
            <div>
              {isCardVisible && (
                <>
                  <h2>{cardNumber}</h2>
                  <ul>
                    <ol>{name}</ol>
                    <ol>{date}</ol>
                  </ul>
                </>
              )}
            </div>
          </div>
          <div className="back-card">
            <p>{cvc}</p>
          </div>
        </div>

        <div className="container">
          <form className="payment-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="cardholder_name">Cardholder Name</label>
              <input
                type="text"
                name="cardholder_name"
                id="cardholder_name"
                placeholder="e.g. Jena Ashrumochan"
                value={name}
                maxLength={17}
                onChange={(e) => {
                  const inputValue = e.target.value.toUpperCase(); // Convert to uppercase
                  if (/^[A-Z ]+$/.test(inputValue)) {
                    setName(inputValue);
                  }
                }}
                onKeyDown={(e) => {
                  // Prevent the backtick (`) key from being entered
                  if (e.key === "`") {
                    e.preventDefault();
                  }
                }}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="card_number">Card Number</label>
              <input
                type="text"
                name="card_number"
                id="card_number"
                placeholder="e.g. 1234 5678 9012 0000"
                maxLength={19}
                value={cardNumber}
                onChange={(e) => {
                  const inputCardNumber = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
                  const formattedCardNumber = inputCardNumber
                    .replace(/(\d{4})/g, "$1 ") // Add spaces every 4 digits
                    .trim();
                  setCardNumber(formattedCardNumber);
                }}
                required
              />
              {cardNumberError && (
                <p className="error small-text">{cardNumberError}</p>
              )}
            </div>

            <div className="details">
              <div className="form-group1">
                <label htmlFor="expiration_date">Exp. Date (mm/yy)</label>
                <div className="form-group1">
                  <div className="input-group">
                    <input
                      type="text"
                      name="expiration_month"
                      id="expiration_month"
                      placeholder="MM"
                      max={12}
                      maxLength={2}
                      value={date.split("/")[0]} // Extract month from the date
                      onChange={(e) =>
                        setDate(
                          `${e.target.value.replace(/\D/g, "")}/${date.split("/")[1] || ""
                          }`
                        )
                      }
                      required
                    />
                    <input
                      type="text"
                      name="expiration_year"
                      id="expiration_year"
                      placeholder="YY"
                      maxLength={2}
                      value={date.split("/")[1] || ""} // Extract year from the date
                      onChange={(e) =>
                        setDate(
                          `${date.split("/")[0] || ""}/${e.target.value.replace(
                            /\D/g,
                            ""
                          )}`
                        )
                      }
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-group1">
                <label htmlFor="cvc">CVC</label>
                <input
                  type="text"
                  name="cvc"
                  id="cvc"
                  placeholder="e.g. 123"
                  maxLength={3}
                  value={cvc}
                  onChange={(e) => {
                    const inputCVC = e.target.value;
                    setCvc(inputCVC.slice(0, 3)); // Limit to 3 characters
                  }}
                  required
                />
                {cvcError && <p className="error small-text">{cvcError}</p>}
              </div>
            </div>
            <button type="submit">Confirm</button>
          </form>
          {showSuccessMessage && isValid && <p>Successful</p>}
        </div>
      </section>
    </>
  );
}

export default App;
