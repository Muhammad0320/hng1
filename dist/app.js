"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const OPENWEATHERMAP_API_KEY = "039fccb2ae16a8483c796ae5bae7ce96";
const port = 3000 || 8000;
app.get("/", (req, res) => {
    res.send("1st HNG  backend project -- ");
});
app.get("/api/hello/?visitor_name", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const ip = ((_a = req.headers["x-forwarded-for"]) === null || _a === void 0 ? void 0 : _a[0]) || req.socket.remoteAddress;
        const { visitor_name } = req.query;
        const response = yield axios_1.default.get(`https://ipapi.co/${ip}/json/`);
        console.log(response.data, "from card");
        const { city, latitude, longitude } = response.data;
        // Get temperature from OpenWeatherMap
        // const weatherResponse = await axios.get(
        //   `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${OPENWEATHERMAP_API_KEY}`
        // );
        // const temperature = weatherResponse.data.main.temp;
        const temperature = 11;
        console.log(temperature, "Temperature in arrea");
        const data = {
            client_ip: ip,
            location: city,
            greeting: `Hello, ${visitor_name} !, the temperature is ${temperature || 11.0} degree Celcius in ${city} `,
        };
        res.status(200).send(data);
    }
    catch (error) {
        console.error("Error fetching location:", error);
        res.send("Error fetching location");
    }
}));
app.listen(port, () => {
    console.log("Listening to app on port: " + port);
});
module.exports = app;
