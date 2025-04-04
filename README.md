<h1>Debt Collector System</h1>
<p>The Debt Collection Program is a simple and efficient tool designed to help debt collectors manage, track, and recover outstanding debts. This program provides features to streamline the debt recovery process, ensuring timely reminders, proper record-keeping, and effective communication with debtors.</p>
</hr>
<h3>Design</h3>
<p>A clean and simple design that lets you focus on what matters without distractions.</p>
<p align="center">
  <img width="50%" src="https://github.com/user-attachments/assets/131ef7aa-51bd-4b8a-bb98-93e8280261ef"/>
</p>
<p align="center">
  <img width="25%" src="https://github.com/user-attachments/assets/1f6dff0c-b16e-4958-ac7a-50a82325beab"/>
</p>
<hr>
<h1>Collector side</h1>
<p>The debt collector can use the Stripe dashboard to see the payments. From here, they can be transferred to a bank account. On the server side, there is a file called data.json. This file contains the amount owed and a history of all payments made.</p>
<h4>Example data.json</h4>

```json
{
  "AMOUNT_OWED": 1596,
  "PAYMENT_HX": [
    {
      "DATE": "2025-04-04T15:57:12.969Z",
      "AMOUNT": 1
    },
    {
      "DATE": "2025-04-04T16:03:50.461Z",
      "AMOUNT": 3
    }
  ]
}
```
<h1>Setup</h1>
<p>In order to set up the Debt Collector in your environment, you need all the files in the repository. Once those are downloaded, you need to create a .env file named .env in the server folder. This file will contain your API key. To obtain an API key, head over to <a href="https://stripe.com">stripe.com</a> and create an account. Once your account is created, create the .env file as shown in the example below.</p>

```.env
PRIV_KEY="SECRET_KEY_HERE"

```

<pOnce that is done, you may want to change the port that the application is running on. The value for the port is at the bottom of the server.js file. Once you are satisfied with this, the last thing to do is set the amount owed. This can be done by going into the data.json file and changing the <code>AMOUNT_OWED</code> field.</p>
```json
{
  "AMOUNT_OWED": Put your amount owed here,
  "PAYMENT_HX": []
}
```

<p>Lastly use the command <code>node server.js</code> to start the server and website.</p>
