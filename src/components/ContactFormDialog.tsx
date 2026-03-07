import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Send, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
} from '@/components/ui/drawer';
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

function ContactForm({ onSuccess }: { onSuccess: () => void }) {
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', message: '' },
  });

  // Auto-scroll the active field into view when focused (helps with mobile keyboard)
  useEffect(() => {
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (formRef.current?.contains(target) && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
      }
    };
    document.addEventListener('focusin', handleFocusIn);
    return () => document.removeEventListener('focusin', handleFocusIn);
  }, []);

  const onSubmit = async (values: ContactFormValues) => {
    setSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: values,
      });
      if (error) throw error;
      toast({ title: 'Message sent', description: "Thanks for reaching out - we'll get back to you soon." });
      form.reset();
      onSuccess();
    } catch {
      toast({ title: 'Something went wrong', description: 'Please try again later.', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" className="h-9 text-sm" {...field} />
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
                <FormLabel className="text-xs">Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@example.com" className="h-9 text-sm" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Message</FormLabel>
              <FormControl>
                <Textarea placeholder="How can we help?" rows={3} className="text-sm resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={submitting} className="w-full h-9 text-sm">
          {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-1.5" /> : <Send className="w-4 h-4 mr-1.5" />}
          {submitting ? 'Sending…' : 'Send message'}
        </Button>
      </form>
    </Form>
  );
}

export function ContactFormDialog() {
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  const trigger = (
    <button className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mt-8">
      <Mail className="w-4 h-4" />
      Need more help? Contact&nbsp;us
    </button>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>{trigger}</DrawerTrigger>
        <DrawerContent className="px-5 pb-6 pt-2">
          <DrawerHeader className="px-0 pb-2 pt-0">
            <DrawerTitle className="text-base font-bold text-foreground">Contact us</DrawerTitle>
            <DrawerDescription className="text-xs text-muted-foreground">
              Send us a message and we'll get back to you.
            </DrawerDescription>
          </DrawerHeader>
          <ContactForm onSuccess={() => setOpen(false)} />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="rounded-2xl border-border/40 bg-background/95 backdrop-blur-xl shadow-xl max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-foreground">Contact us</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Send us a message and we'll get back to you.
          </DialogDescription>
        </DialogHeader>
        <ContactForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
