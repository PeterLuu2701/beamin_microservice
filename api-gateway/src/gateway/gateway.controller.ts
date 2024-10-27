import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, lastValueFrom, of, retry, timeout } from 'rxjs';

@Controller('gateway')
export class GatewayController {
  constructor(
    // private jwtService: JwtService,
    @Inject('USER_NAME') private userService: ClientProxy,
    @Inject('AUTH_NAME') private authService: ClientProxy,
    @Inject('FOOD_TYPE_NAME') private foodTypeService: ClientProxy,
    @Inject('FOOD_CARD_NAME') private foodCardService: ClientProxy,
    @Inject('RESTAURANT_NAME') private restaurantService: ClientProxy,
    @Inject('RESTAURANT_FOOD_NAME') private restaurantFoodService: ClientProxy,
    @Inject('RESTAURANT_MENU_NAME') private restaurantMenuService: ClientProxy,
    @Inject('ORDER_NAME') private orderService: ClientProxy,
  ) {}

  @Get('/get-all-user')
  async getAllUser() {
    let listUser = await lastValueFrom(
      this.userService.send('get-all-user', '').pipe(
        timeout(5000),
        retry(3),
        catchError((err) => {
          return of({
            err,
          });
        }),
      ),
    );
    console.log(listUser);

    return listUser;
  }

  @Post('/login')
  async login(@Body() loginDto: { user_name: string; password: string }) {
    const response = await lastValueFrom(
      this.authService.send('login-user', loginDto).pipe(
        catchError((err) => {
          return of({
            err,
            message: 'Unable to login user',
          });
        }),
      ),
    );

    if (response?.err) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return response;
  }

  @Get('/get-all-food-type')
  async getAllFoodType() {
    let listFoodType = await lastValueFrom(
      this.foodTypeService.send('get-all-food-type', '').pipe(
        timeout(5000),
        retry(3),
        catchError((err) => {
          return of({
            err,
          });
        }),
      ),
    );
    console.log(listFoodType);

    return listFoodType;
  }

  @Get('/get-all-food-card')
  async getAllFoodCard() {
    let listFoodCard = await lastValueFrom(
      this.foodCardService.send('get-all-food-card', '').pipe(
        timeout(5000),
        retry(5),
        catchError((err) => {
          return of({
            err,
          });
        }),
      ),
    );
    console.log(listFoodCard);

    return listFoodCard;
  }

  @Get('/get-food-card-by-search')
  async findByKeyword(
    @Query('keyword') keyword: string,
    @Query('page') page: number,
  ) {
    const data = { keyword, page };

    let searchResults = await lastValueFrom(
      this.foodCardService.send('get-food-card-by-search', data).pipe(
        timeout(5000),
        retry(3),
        catchError((err) => {
          return of({
            err,
          });
        }),
      ),
    );

    console.log('Search Results: ', searchResults);
    return searchResults;
  }

  @Get('/get-all-restaurant')
  async getAllRestaurant() {
    let listRestaurant = await lastValueFrom(
      this.restaurantService.send('get-all-restaurant', '').pipe(
        timeout(5000),
        retry(5),
        catchError((err) => {
          return of({
            err,
          });
        }),
      ),
    );
    console.log(listRestaurant);

    return listRestaurant;
  }

  @Get('/get-restaurant-by-id/:id')
  async findRestaurantById(@Param('id') id: number) {
    const data = { id };

    let searchResults = await lastValueFrom(
      this.restaurantService.send('get-restaurant-by-id', data).pipe(
        timeout(5000),
        retry(3),
        catchError((err) => {
          return of({ err });
        }),
      ),
    );

    console.log('Search Results:', searchResults);
    return searchResults;
  }

  @Get('/get-all-restaurant-food')
  async getAllRestaurantFood() {
    let listRestaurantFood = await lastValueFrom(
      this.restaurantFoodService.send('get-all-restaurant-food', '').pipe(
        timeout(5000),
        retry(5),
        catchError((err) => {
          return of({
            err,
          });
        }),
      ),
    );
    console.log(listRestaurantFood);

    return listRestaurantFood;
  }

  @Get('/get-restaurant-food-by-restaurant-id/:id')
  async findRestaurantFoodByRestaurantId(@Param('id') id: number) {
    const data = { id };

    let searchResults = await lastValueFrom(
      this.restaurantFoodService.send('get-restaurant-food-by-restaurant-id', data).pipe(
        timeout(5000),
        retry(3),
        catchError((err) => {
          return of({ err });
        }),
      ),
    );

    console.log('Search Results:', searchResults);
    return searchResults;
  }

  @Get('/get-all-restaurant-menu')
  async getAllRestaurantMenu() {
    let listRestaurantMenu = await lastValueFrom(
      this.restaurantMenuService.send('get-all-restaurant-menu', '').pipe(
        timeout(5000),
        retry(5),
        catchError((err) => {
          return of({
            err,
          });
        }),
      ),
    );
    console.log(listRestaurantMenu);

    return listRestaurantMenu;
  }

  @Get('/get-restaurant-menu-by-restaurant-id/:id')
  async findRestaurantMenuByRestaurantId(@Param('id') id: number) {
    const data = { id };

    let searchResults = await lastValueFrom(
      this.restaurantMenuService.send('get-restaurant-menu-by-restaurant-id', data).pipe(
        timeout(5000),
        retry(3),
        catchError((err) => {
          return of({ err });
        }),
      ),
    );

    console.log('Search Results:', searchResults);
    return searchResults;
  }

  @Post('/create-order')
  async createOrder(
    @Query('token') token: string,
    @Body() body: { quantity: number; restaurantId: string; restaurantFoodId: string }
  ) {
    try {
      const { quantity, restaurantId, restaurantFoodId } = body;

      // Forward request to order microservice
      const response = await lastValueFrom(
        this.orderService.send('create-order', { token, quantity, restaurantId, restaurantFoodId }).pipe(
          catchError((err) => {
            return of({
              error: err.message,
              message: 'Unable to create order',
            });
          })
        )
      );

      // Check for errors in the response
      if (response?.error) {
        throw new UnauthorizedException(response.message || 'Order creation failed');
      }

      return response;
    } catch (error) {
      throw new UnauthorizedException('Order creation failed');
    }
  }
}
