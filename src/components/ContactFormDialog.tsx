import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Send, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100, 'Name must be under 100 characters'),
  email: z.string().trim().email('Please enter a valid email').max(255, 'Email must be under 255 characters'),
  message: z.string().trim().min(1, 'Message is required').max(2000, 'Message must be under 2000 characters'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactFormDialog() {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', message: '' },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: values,
      });

      if (error) throw error;

      toast({ title: 'Message sent', description: "Thanks for reaching out — we'll get back to you soon." });
      form.reset();
      setOpen(false);
    } catch {
      toast({ title: 'Something went wrong', description: 'Please try again later.', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mt-8">
          <Mail className="w-4 h-4" />
          Need more help? Contact&nbsp;us
        </button>
      </DialogTrigger>
      <DialogContent className="rounded-2xl border-white/40 bg-white/80 backdrop-blur-xl shadow-xl max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-foreground">Contact us</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Send us a message and we'll get back to you.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea placeholder="How can we help?" rows={4} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              {submitting ? 'Sending…' : 'Send message'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
