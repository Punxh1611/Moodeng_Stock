-- Table: fridge_notes
CREATE TABLE public.fridge_notes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    type TEXT NOT NULL CHECK (type IN ('menu', 'note')),
    content TEXT NOT NULL,
    is_today BOOLEAN DEFAULT false,
    note_style TEXT DEFAULT 'yellow-classic',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS (Row Level Security)
ALTER TABLE public.fridge_notes ENABLE ROW LEVEL SECURITY;

-- Allow anonymous access (since we don't use auth yet)
CREATE POLICY "Allow anonymous select on fridge_notes" ON public.fridge_notes FOR SELECT USING (true);
CREATE POLICY "Allow anonymous insert on fridge_notes" ON public.fridge_notes FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous update on fridge_notes" ON public.fridge_notes FOR UPDATE USING (true);
CREATE POLICY "Allow anonymous delete on fridge_notes" ON public.fridge_notes FOR DELETE USING (true);
