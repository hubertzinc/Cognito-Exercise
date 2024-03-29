using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ZincApi.Entities;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCognitoIdentity();
builder.Services.AddAuthentication(options =>
{
   options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
   options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
   options.Authority = builder.Configuration["Cognito:Authority"];
   options.TokenValidationParameters = new TokenValidationParameters
   {
      ValidateIssuerSigningKey = true,
      ValidateAudience = false
   };
});

builder.Services.AddCors(options => 
{
   options.AddPolicy("AllowAll", builder =>
   {
      builder.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
   });
});

builder.Services.AddDbContext<StoreContext>(options =>
   options.UseSqlServer(
      builder.Configuration.GetConnectionString("StoreContext"),
      b => b.MigrationsAssembly(typeof(StoreContext).Assembly.FullName)));

builder.Services.AddScoped<IStoreRepository, StoreRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
   app.UseSwagger();
   app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
