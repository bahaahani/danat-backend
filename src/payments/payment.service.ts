import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity';
import { User } from '../users/user.entity';
import { Course } from '../courses/entities/course.entity';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class PaymentService {
  private stripe: any;

  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    private configService: ConfigService,
  ) {
    // this.stripe = new Stripe(this.configService.get<string>('STRIPE_SECRET_KEY'));
  }

  async createPaymentIntent(userId: number, courseId: number, amount: number): Promise<{ clientSecret: string }> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const course = await this.courseRepository.findOne({ where: { id: courseId } });

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount * 100, // Stripe expects amount in cents
      currency: 'usd',
      customer: user.id,
    });

    return { clientSecret: paymentIntent.client_secret };
  }

  async confirmPayment(userId: number, paymentMethodId: string, paymentIntentId: string): Promise<{ paymentIntent: any }> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    const paymentIntent = await this.stripe.paymentIntents.confirm(paymentIntentId, {
      payment_method: paymentMethodId,
    });

    const payment = await this.paymentRepository.save({
      amount: paymentIntent.amount / 100, // Stripe returns amount in cents
      paymentMethod: paymentIntent.payment_method,
      paymentStatus: paymentIntent.status,
      paymentDate: new Date(),
      user,
      course: null, // Course can be added later when the user enrolls
    });

    return { paymentIntent };
  }

  async createPaymentMethod(userId: number, paymentMethod: any): Promise<{ paymentMethod: any }> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const storedPaymentMethod = await this.stripe.paymentMethods.create({
      type: 'card',
      card: paymentMethod,
      customer: user.id,
    });

    return { paymentMethod: storedPaymentMethod };
  }
}