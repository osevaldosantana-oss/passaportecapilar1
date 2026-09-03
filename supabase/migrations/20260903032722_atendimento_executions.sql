-- Tabela para registrar execuções de atendimento
CREATE TABLE IF NOT EXISTS atendimento_executions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id TEXT NOT NULL,
  client_name TEXT NOT NULL,
  base_treatment TEXT NOT NULL,
  active_ingredients TEXT[] DEFAULT '{}',
  proportion_base INTEGER DEFAULT 1,
  proportion_active NUMERIC(3,1) DEFAULT 1.0,
  pause_time_minutes INTEGER DEFAULT 20,
  protocol_steps JSONB DEFAULT '[]',
  tech_notes TEXT,
  execution_time_seconds INTEGER,
  professional_name TEXT DEFAULT 'Dr. Thay',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE atendimento_executions ENABLE ROW LEVEL SECURITY;

-- Policy para profissionais visualizarem todas execuções
CREATE POLICY "Professionals can view all executions"
  ON atendimento_executions FOR SELECT
  TO authenticated
  USING (true);

-- Policy para profissionais criarem execuções
CREATE POLICY "Professionals can create executions"
  ON atendimento_executions FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy para profissionais atualizarem execuções
CREATE POLICY "Professionals can update executions"
  ON atendimento_executions FOR UPDATE
  TO authenticated
  USING (true);

-- Trigger para updated_at automático
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_atendimento_executions_updated_at
  BEFORE UPDATE ON atendimento_executions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();