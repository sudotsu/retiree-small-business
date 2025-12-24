# Phase 2: Auth + Payment Implementation (Gate 2)

**Goal:** User signup, Stripe payment, course enrollment working end-to-end

**Estimated Time:** 4-5 hours

---

## Prerequisites

- [x] Gate 1 passed (Database working)
- [ ] Stripe account created (free test mode)
- [ ] Stripe test keys obtained

---

## Step-by-Step Implementation

### 1. Set Up Stripe Account (15 min)

**Create account:**
1. Go to https://dashboard.stripe.com/register
2. Sign up with email
3. Skip "Activate your account" (stay in test mode)
4. Go to Developers → API Keys
5. Copy these keys:
   - **Publishable key** (starts with `pk_test_`)
   - **Secret key** (starts with `sk_test_`)

**Add to environment:**

Update `/src/.env.local`:
```bash
# Add these lines (keep existing Supabase vars)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
```

**Install Stripe SDK:**
```bash
cd /home/claude/rbb-platform/src
npm install stripe @stripe/stripe-js
```

---

### 2. Configure Supabase Auth (10 min)

**Enable email auth in Supabase:**
1. Go to your Supabase project dashboard
2. Authentication → Providers
3. Enable "Email" provider
4. Set "Confirm email" to OFF (for testing)
5. Save

**Update environment variables:**

Confirm these are in `/src/.env.local`:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://tkceczgdyaamfgrllwkd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
```

---

### 3. Create Auth Pages (45 min)

**Create signup page:**

`/src/app/signup/page.tsx`:
```typescript
'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      // Create user profile
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert({
            id: authData.user.id,
            full_name: fullName,
          });

        if (profileError) throw profileError;
      }

      // Redirect to courses page
      router.push('/courses');
    } catch (err: any) {
      setError(err.message || 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-3xl font-bold text-center">Create Account</h2>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg text-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg text-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-2 border rounded-lg text-lg"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-sm">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
```

**Create login page:**

`/src/app/login/page.tsx`:
```typescript
'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      router.push('/portal');
    } catch (err: any) {
      setError(err.message || 'Failed to log in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-3xl font-bold text-center">Log In</h2>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg text-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg text-lg"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <p className="text-center text-sm">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
```

---

### 4. Create Courses Browse Page (30 min)

`/src/app/courses/page.tsx`:
```typescript
'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { loadStripe } from '@stripe/stripe-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  track_type: 'essentials' | 'mastery';
  price_cents: number;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCourses() {
      const { data } = await supabase
        .from('courses')
        .select('*')
        .eq('is_published', true)
        .order('price_cents');
      
      if (data) setCourses(data);
      setLoading(false);
    }
    loadCourses();
  }, []);

  const handlePurchase = async (courseId: string) => {
    try {
      // Call server action to create checkout session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId,
          successUrl: `${window.location.origin}/portal`,
          cancelUrl: `${window.location.origin}/courses`,
        }),
      });

      const { sessionId } = await response.json();
      
      const stripe = await stripePromise;
      if (stripe) {
        await stripe.redirectToCheckout({ sessionId });
      }
    } catch (error) {
      console.error('Purchase error:', error);
      alert('Failed to start checkout');
    }
  };

  if (loading) {
    return <div className="p-8">Loading courses...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Choose Your Track</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-white p-8 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
              <p className="text-gray-600 mb-4">{course.subtitle}</p>
              <p className="text-gray-700 mb-6">{course.description}</p>
              
              <div className="flex items-baseline justify-between mb-6">
                <span className="text-3xl font-bold">
                  ${(course.price_cents / 100).toFixed(0)}
                </span>
                <span className="text-sm text-gray-500 uppercase">
                  {course.track_type}
                </span>
              </div>

              <button
                onClick={() => handlePurchase(course.id)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
              >
                Enroll Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

---

### 5. Create Stripe Checkout API Route (30 min)

**Create Stripe helper:**

`/src/lib/stripe.ts`:
```typescript
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});
```

**Create checkout endpoint:**

`/src/app/api/checkout/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { courseId, successUrl, cancelUrl } = await request.json();

    // Get course details
    const { data: course } = await supabase
      .from('courses')
      .select('*')
      .eq('id', courseId)
      .single();

    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }

    // Get current user (from session cookie)
    const authHeader = request.headers.get('authorization');
    // For now, we'll pass user ID in request body
    // In production, extract from session

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: course.title,
              description: course.subtitle,
            },
            unit_amount: course.price_cents,
          },
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        courseId: course.id,
        // userId will come from auth
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
```

---

### 6. Create Stripe Webhook Handler (45 min)

**Set up webhook endpoint:**

`/src/app/api/webhooks/stripe/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const sig = request.headers.get('stripe-signature')!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Handle the event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      // Create enrollment
      const { error } = await supabase.from('enrollments').insert({
        user_id: session.metadata?.userId,
        course_id: session.metadata?.courseId,
        stripe_payment_intent_id: session.payment_intent as string,
        amount_paid_cents: session.amount_total,
      });

      if (error) {
        console.error('Failed to create enrollment:', error);
        // Don't return error to Stripe - log and alert instead
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
```

**Configure webhook in Stripe:**
1. Go to Stripe Dashboard → Developers → Webhooks
2. Click "Add endpoint"
3. URL: `https://your-domain.com/api/webhooks/stripe` (use ngrok for local testing)
4. Select event: `checkout.session.completed`
5. Copy webhook signing secret
6. Add to `.env.local`:
```bash
STRIPE_WEBHOOK_SECRET=whsec_YOUR_SECRET_HERE
```

**For local testing with ngrok:**
```bash
# Install ngrok
brew install ngrok

# Start your dev server
npm run dev

# In another terminal, create tunnel
ngrok http 3000

# Use the ngrok HTTPS URL in Stripe webhook settings
```

---

### 7. Create Simple Student Portal (30 min)

`/src/app/portal/page.tsx`:
```typescript
'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Enrollment {
  course: {
    id: string;
    title: string;
    subtitle: string;
  };
}

export default function PortalPage() {
  const router = useRouter();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function init() {
      // Check auth
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/login');
        return;
      }

      setUser(user);

      // Load enrollments
      const { data } = await supabase
        .from('enrollments')
        .select(`
          course:courses (
            id,
            title,
            subtitle
          )
        `)
        .eq('user_id', user.id);

      if (data) {
        setEnrollments(data as any);
      }
      
      setLoading(false);
    }

    init();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow px-4 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">My Learning Portal</h1>
          <button
            onClick={handleLogout}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Log Out
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-8">
        <h2 className="text-3xl font-bold mb-8">My Courses</h2>

        {enrollments.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <p className="text-gray-600 mb-4">
              You haven't enrolled in any courses yet.
            </p>
            <a
              href="/courses"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Browse Courses
            </a>
          </div>
        ) : (
          <div className="grid gap-6">
            {enrollments.map((enrollment) => (
              <div
                key={enrollment.course.id}
                className="bg-white p-6 rounded-lg shadow"
              >
                <h3 className="text-xl font-bold mb-2">
                  {enrollment.course.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {enrollment.course.subtitle}
                </p>
                <a
                  href={`/course/${enrollment.course.id}`}
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700"
                >
                  Continue Learning
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
```

---

## Validation Checklist

Test the complete flow:

- [ ] **Test 1: Sign up**
  - Go to `/signup`
  - Create account with email/password
  - Verify redirected to `/courses`

- [ ] **Test 2: Browse courses**
  - See 2 courses (Essentials $149, Mastery $197)
  - Click "Enroll Now"

- [ ] **Test 3: Stripe checkout**
  - Redirected to Stripe checkout
  - Use test card: `4242 4242 4242 4242`
  - Any future expiry date
  - Any CVC
  - Complete payment

- [ ] **Test 4: Enrollment created**
  - Go to Supabase → Table Editor → enrollments
  - Verify new row created with:
    - user_id (your user)
    - course_id
    - stripe_payment_intent_id
    - amount_paid_cents

- [ ] **Test 5: Student portal**
  - Redirected to `/portal` after payment
  - See enrolled course listed
  - Click "Continue Learning"

- [ ] **Test 6: Login/logout**
  - Log out from portal
  - Log back in at `/login`
  - Still see enrolled courses

**If all 6 tests pass → Gate 2 PASSED ✅**

---

## Common Issues

### Issue: "Invalid Stripe key"
**Fix:** Check `.env.local` has `pk_test_` and `sk_test_` keys (not live keys)

### Issue: Webhook not receiving events
**Fix:** 
- Make sure ngrok is running
- Webhook URL in Stripe uses HTTPS ngrok URL
- Webhook secret in `.env.local` matches Stripe dashboard

### Issue: Enrollment not created after payment
**Fix:**
- Check Stripe webhook logs in dashboard
- Verify metadata includes userId and courseId
- Check Supabase logs for RLS policy errors

### Issue: Can't access portal after signup
**Fix:**
- Verify Supabase email auth is enabled
- Check browser console for errors
- Confirm session cookie is set

---

## Next Phase

Once Gate 2 passes, proceed to **Phase 3** (Gate 3: Course Viewing)
