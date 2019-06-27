{{/*
Specialized .Values.host default value logic
*/}}
{{- define "site.host" -}}
{{- if .Values.host -}}
{{ .Values.host }}
{{- else if eq .Values.env "prod" -}}
www.kscout.io
{{- else -}}
{{ .Values.env }}-www.kscout.io
{{- end -}}
{{- end -}}
