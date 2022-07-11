class Config {
    public registerUrl = '';
    public loginUrl = '';
    public vacationsUrl = '';
    public vacationImageUrl = '';
    public addVacationUrl = '';
    public liveReportUrl = '';
    public adminUrl = '';
};

class DevelopmentConfig extends Config {
    public registerUrl = 'http://localhost:3001/api/auth/register';
    public loginUrl = 'http://localhost:3001/api/auth/login';
    public vacationsUrl = 'http://localhost:3001/api/vacations';
    public vacationImageUrl = 'http://localhost:3001/api/vacations/image/';
    public addVacationUrl = 'http://localhost:3001/api/admin-page/add-vacation';
    public liveReportUrl = 'http://localhost:3001/api/admin-page/live-reports';
    public adminUrl = 'http://localhost:3001/api/admin-page'
};

class ProductionConfig extends Config {
    public registerUrl = 'http://localhost:3001/api/auth/register';
    public loginUrl = 'http://localhost:3001/api/auth/login';
    public vacationsUrl = 'http://localhost:3001/api/vacations';
    public vacationImageUrl = 'http://localhost:3001/api/vacations/image/';
    public liveReportUrl = 'http://localhost:3001/api/admin-page/live-reports';
    public addVacationUrl = 'http://localhost:3001/api/admin-page/add-vacation';
    public adminUrl = 'http://localhost:3001/api/admin-page'

};

let config: Config;
process.env.NODE_ENV === "development" ? config = new DevelopmentConfig() : config = new ProductionConfig();

export default config;

