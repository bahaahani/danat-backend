import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/payment')
@UseGuards(JwtAuthGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @Post('create-payment-intent')
  async createPaymentIntent(@Request() req, @Body() { courseId, amount }: { courseId: number; amount: number }): Promise<{ clientSecret: string }> {
    return this.paymentService.createPaymentIntent(req.user.id, courseId, amount);
  }

  @Post('confirm')
  async confirmPayment(@Request() req, @Body() { paymentMethodId, paymentIntentId }: { paymentMethodId: string; paymentIntentId: string }): Promise<{ paymentIntent: any }> {
    return this.paymentService.confirmPayment(req.user.id, paymentMethodId, paymentIntentId);
  }

  @Post('create-payment-method')
  async createPaymentMethod(@Request() req, @Body() { paymentMethod }: { paymentMethod: any }): Promise<{ paymentMethod: any }> {
    return this.paymentService.createPaymentMethod(req.user.id, paymentMethod);
  }
}