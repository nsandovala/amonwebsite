import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

// Validation schema for meeting request
const MeetingRequestSchema = z.object({
    name: z.string().min(1, 'Name is required').max(100),
    email: z.string().email('Invalid email address').max(100),
    orgType: z
        .enum(['Municipalidad', 'Centro Médico', 'Farmacia', 'Prensa', 'Inversor', 'Otro'])
        .optional(),
    org: z.string().max(200).optional(),
    role: z.string().max(100).optional(),
    message: z.string().max(1000).optional(),
    country: z.string().max(100).optional(),
    topic: z.string().max(100).optional(),
});

export async function POST(request: NextRequest) {
    try {
        // Parse request body
        const body = await request.json();

        // Validate input
        const validatedData = MeetingRequestSchema.parse(body);

        // Store in database
        const meetingRequest = await prisma.meetingRequest.create({
            data: {
                name: validatedData.name,
                email: validatedData.email,
                orgType: validatedData.orgType || null,
                org: validatedData.org || null,
                role: validatedData.role || null,
                message: validatedData.message || null,
                country: validatedData.country || null,
                topic: validatedData.topic || null,
                source: 'amonwebsite',
                status: 'NEW',
            },
        });

        return NextResponse.json({ ok: true, id: meetingRequest.id }, { status: 200 });
    } catch (error) {
        // Handle Zod validation errors
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                {
                    ok: false,
                    error: 'Validation error',
                    details: (error as any).errors,
                },
                { status: 400 }
            );
        }

        // Handle database errors
        console.error('Error creating meeting request:', error);
        return NextResponse.json(
            {
                ok: false,
                error: 'Failed to create meeting request. Please try again.',
            },
            { status: 500 }
        );
    }
}
